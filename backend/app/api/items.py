from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    db_item = crud.get_item_by_name(db, name=item.name)
    if db_item:
        raise HTTPException(status_code=400, detail="Item already exists")
    return crud.create_item(db=db, item=item)

@router.get("/", response_model=list[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

@router.post("/{item_id}/claim", response_model=schemas.Item)
def claim_item(item_id: int, user_id: int, db: Session = Depends(get_db)):
    return crud.claim_item(db=db, item_id=item_id, user_id=user_id)

@router.post("/{item_id}/mark_bought", response_model=schemas.Item)
def mark_item_as_bought(item_id: int, user_id: int, db: Session = Depends(get_db)):
    return crud.mark_item_as_bought(db=db, item_id=item_id, user_id=user_id)