from pydantic import BaseModel
from typing import List, Optional

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    claimed_by: Optional[int] = None
    is_bought: bool = False

class User(BaseModel):
    id: int
    name: str
    email: str

class Group(BaseModel):
    id: int
    name: str
    members: List[int] = []

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None

class UserCreate(BaseModel):
    name: str
    email: str

class GroupCreate(BaseModel):
    name: str

class ItemUpdate(BaseModel):
    claimed_by: Optional[int] = None
    is_bought: Optional[bool] = None

class UserInGroup(BaseModel):
    user_id: int
    group_id: int