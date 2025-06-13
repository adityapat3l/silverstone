from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/users/", response_model=schemas.User)
def create_user(user: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@router.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@router.post("/items/claim/{item_id}", response_model=schemas.Item)
def claim_item(item_id: int, user_id: int, db: Session = Depends(get_db)):
    item = crud.get_item(db, item_id=item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud.claim_item(db=db, item=item, user_id=user_id)

@router.post("/items/mark-bought/{item_id}", response_model=schemas.Item)
def mark_item_as_bought(item_id: int, db: Session = Depends(get_db)):
    item = crud.get_item(db, item_id=item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return crud.mark_item_as_bought(db=db, item=item)