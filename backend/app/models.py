from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    groups = relationship("Group", secondary="user_groups")

class Group(Base):
    __tablename__ = 'groups'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    members = relationship("User", secondary="user_groups")

class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    claimed_by = Column(Integer, ForeignKey('users.id'), nullable=True)
    group_id = Column(Integer, ForeignKey('groups.id'))

class UserGroups(Base):
    __tablename__ = 'user_groups'

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    group_id = Column(Integer, ForeignKey('groups.id'), primary_key=True)