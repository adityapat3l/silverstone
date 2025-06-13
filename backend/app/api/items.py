from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..database import get_db
from typing import List

router = APIRouter()

@router.post("/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)

@router.get("/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

@router.get("/unclaimed", response_model=List[schemas.Item])
def read_unclaimed_items(db: Session = Depends(get_db)):
    return crud.get_unclaimed_items(db)

@router.get("/user/{user_id}", response_model=List[schemas.Item])
def read_user_items(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_items(db, user_id=user_id)

@router.get("/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.post("/{item_id}/claim", response_model=schemas.Item)
def claim_item(item_id: int, user_id: int, db: Session = Depends(get_db)):
    return crud.claim_item(db=db, item_id=item_id, user_id=user_id)

@router.post("/{item_id}/unclaim", response_model=schemas.Item)
def unclaim_item(item_id: int, user_id: int, db: Session = Depends(get_db)):
    return crud.unclaim_item(db=db, item_id=item_id, user_id=user_id)

@router.post("/{item_id}/mark_bought", response_model=schemas.Item)
def mark_item_as_bought(item_id: int, user_id: int, db: Session = Depends(get_db)):
    return crud.mark_item_as_bought(db=db, item_id=item_id, user_id=user_id)

@router.post("/{item_id}/mark_not_bought", response_model=schemas.Item)
def mark_item_as_not_bought(item_id: int, user_id: int, db: Session = Depends(get_db)):
    return crud.mark_item_as_not_bought(db=db, item_id=item_id, user_id=user_id)