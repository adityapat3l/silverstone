from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api import items, groups, users, superadmin
from app.database import engine
from app import models
from fastapi.responses import JSONResponse

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Camping App API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with explicit prefixes
app.include_router(items.router, prefix="/items", tags=["items"])
app.include_router(groups.router, prefix="/groups", tags=["groups"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(superadmin.router, prefix="/superadmin", tags=["superadmin"])

@app.get("/", response_class=JSONResponse)
def read_root(request: Request):
    return JSONResponse(
        content={
            "message": "Welcome to the Camping App API!",
            "status": "running",
            "endpoints": [
                "/users",
                "/groups",
                "/items",
                "/superadmin",
                "/debug"
            ]
        }
    )

# Add a debug endpoint
@app.get("/debug")
def debug_info(request: Request):
    return {
        "path": request.url.path,
        "method": request.method,
        "headers": dict(request.headers),
        "query_params": dict(request.query_params)
    }