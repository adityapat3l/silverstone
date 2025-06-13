from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    items = relationship("Item", back_populates="claimed_by_user")

class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    claimed_by = Column(Integer, ForeignKey('users.id'), nullable=True)
    is_bought = Column(Boolean, default=False)
    claimed_by_user = relationship("User", back_populates="items")
