from typing import List, Optional
from pydantic import BaseModel

# Base schemas
class UserBase(BaseModel):
    name: str
    email: str

class ItemBase(BaseModel):
    name: str
    description: str

# Create schemas
class UserCreate(UserBase):
    pass

class ItemCreate(ItemBase):
    pass

# Response schemas
class Item(ItemBase):
    id: int
    claimed_by: Optional[int] = None
    is_bought: bool = False

    class Config:
        from_attributes = True

class User(UserBase):
    id: int
    items: List[Item] = []

    class Config:
        from_attributes = True

class ItemUpdate(BaseModel):
    claimed_by: Optional[int] = None
    is_bought: Optional[bool] = None

# Update forward references
User.model_rebuild()
Item.model_rebuild()