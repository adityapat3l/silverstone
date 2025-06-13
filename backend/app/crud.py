from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import HTTPException

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()

def get_item_by_name(db: Session, name: str):
    return db.query(models.Item).filter(models.Item.name == name).first()

def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

def update_item(db: Session, item_id: int, item: schemas.ItemUpdate):
    db_item = get_item(db, item_id)
    if db_item:
        update_data = item.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

def get_user_items(db: Session, user_id: int):
    return db.query(models.Item).filter(models.Item.claimed_by == user_id).all()

def get_unclaimed_items(db: Session):
    return db.query(models.Item).filter(models.Item.claimed_by == None).all()

def claim_item(db: Session, item_id: int, user_id: int):
    db_item = get_item(db, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    if db_item.claimed_by:
        raise HTTPException(status_code=400, detail="Item already claimed")
    
    db_item.claimed_by = user_id
    db.commit()
    db.refresh(db_item)
    return db_item

def unclaim_item(db: Session, item_id: int, user_id: int):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not item.claimed_by:
        raise HTTPException(status_code=400, detail="Item is not claimed")
    if item.claimed_by != user_id:
        raise HTTPException(status_code=403, detail="Only the user who claimed the item can unclaim it")
    item.claimed_by = None
    item.is_bought = False
    db.commit()
    db.refresh(item)
    return item

def mark_item_as_bought(db: Session, item_id: int, user_id: int):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not item.claimed_by:
        raise HTTPException(status_code=400, detail="Item is not claimed")
    if item.claimed_by != user_id:
        raise HTTPException(status_code=403, detail="Only the user who claimed the item can mark it as bought")
    item.is_bought = True
    db.commit()
    db.refresh(item)
    return item

def mark_item_as_not_bought(db: Session, item_id: int, user_id: int):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if not item.claimed_by:
        raise HTTPException(status_code=400, detail="Item is not claimed")
    if item.claimed_by != user_id:
        raise HTTPException(status_code=403, detail="Only the user who claimed the item can mark it as not bought")
    item.is_bought = False
    db.commit()
    db.refresh(item)
    return item

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.User):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user