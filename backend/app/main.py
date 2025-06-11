from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import items, groups, users, superadmin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)
app.include_router(groups.router)
app.include_router(users.router)
app.include_router(superadmin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Camping App API!"}