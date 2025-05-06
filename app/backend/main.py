from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import engine, get_db

# Tabellen erstellen (nur beim ersten Start)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Food Diary API")

# CORS-Middleware einhängen, **vor** allen Routern/Endpoints
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # oder ["*"] für alle Ursprünge
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post(
    "/entries/",
    response_model=schemas.FoodEntry,
    status_code=status.HTTP_201_CREATED
)
def create_entry(
        entry: schemas.FoodEntryCreate,
        db: Session = Depends(get_db)
):
    db_entry = models.FoodEntry(**entry.dict())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

@app.get(
    "/entries/",
    response_model=List[schemas.FoodEntry]
)
def read_entries(
        skip: int = 0,
        limit: int = 100,
        db: Session = Depends(get_db)
):
    return db.query(models.FoodEntry).offset(skip).limit(limit).all()

@app.get(
    "/entries/{entry_id}",
    response_model=schemas.FoodEntry
)
def read_entry(
        entry_id: int,
        db: Session = Depends(get_db)
):
    entry = db.query(models.FoodEntry).get(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry

@app.put(
    "/entries/{entry_id}",
    response_model=schemas.FoodEntry
)
def update_entry(
        entry_id: int,
        updates: schemas.FoodEntryUpdate,
        db: Session = Depends(get_db)
):
    entry = db.query(models.FoodEntry).get(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(entry, field, value)
    db.commit()
    db.refresh(entry)
    return entry

@app.delete(
    "/entries/{entry_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_entry(
        entry_id: int,
        db: Session = Depends(get_db)
):
    entry = db.query(models.FoodEntry).get(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(entry)
    db.commit()
    return
