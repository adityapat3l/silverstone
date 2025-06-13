from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api import items, users, superadmin
from app.database import engine, Base
from fastapi.responses import JSONResponse

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Camping App API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(items.router, prefix="/api/items", tags=["items"])
app.include_router(superadmin.router, prefix="/api/superadmin", tags=["superadmin"])

@app.get("/", response_class=JSONResponse)
def read_root(request: Request):
    return {
        "message": "Welcome to the Camping App API",
        "docs_url": str(request.url) + "docs",
        "version": "1.0.0"
    }

# Add a debug endpoint
@app.get("/debug")
def debug_info(request: Request):
    return {
        "path": request.url.path,
        "method": request.method,
        "headers": dict(request.headers),
        "query_params": dict(request.query_params)
    }