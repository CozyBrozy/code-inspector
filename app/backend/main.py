import os
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import jwt

import models
import schemas
from database import get_db

# --- Security configuration ---
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


def create_access_token(data: dict) -> str:
    """Generate a JWT access token."""
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """Decode JWT token and return current user info or raise."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: Optional[str] = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    # In a real app, fetch the user from the database here
    return {"id": user_id}


# --- Application setup ---
app = FastAPI(title="Food Diary API")

# Configure CORS dynamically based on environment
if os.getenv("ENV", "development") == "production":
    allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
else:
    allowed_origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Note: Database schema migrations should be handled via Alembic,
# not via create_all() on application startup.


# --- Authentication endpoint ---
@app.post("/token", response_model=schemas.Token)
def login_for_access_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db),
):
    """
    Authenticate user and return a JWT token.
    In production, verify form_data.username & form_data.password against stored credentials.
    """
    # TODO: Replace with actual user verification
    if form_data.username != "admin" or form_data.password != "secret":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(data={"sub": form_data.username})
    return {"access_token": token, "token_type": "bearer"}


# --- Health check endpoint ---
@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    """
    Return application and database health status.
    """
    try:
        db.execute("SELECT 1")
        db_status = "connected"
    except Exception:
        db_status = "error"
    return {"status": "healthy", "database": db_status}


# --- CRUD endpoints with JWT auth ---
@app.post(
    "/entries/",
    response_model=schemas.FoodEntry,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_user)],
)
def create_entry(
        entry: schemas.FoodEntryCreate,
        db: Session = Depends(get_db),
):
    """
    Create a new food entry.
    """
    db_entry = models.FoodEntry(**entry.dict())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


@app.get(
    "/entries/",
    response_model=List[schemas.FoodEntry],
    dependencies=[Depends(get_current_user)],
)
def read_entries(
        limit: int = 100,
        last_id: Optional[int] = None,
        db: Session = Depends(get_db),
):
    """
    Read entries with cursor-based pagination.
    - `limit`: maximum number of items to return
    - `last_id`: only return entries with ID > last_id
    """
    query = db.query(models.FoodEntry)
    if last_id is not None:
        query = query.filter(models.FoodEntry.id > last_id)
    entries = query.order_by(models.FoodEntry.id).limit(limit).all()
    return entries


@app.get(
    "/entries/{entry_id}",
    response_model=schemas.FoodEntry,
    dependencies=[Depends(get_current_user)],
)
def read_entry(
        entry_id: int,
        db: Session = Depends(get_db),
):
    """
    Read a single entry by its ID.
    """
    entry = db.query(models.FoodEntry).get(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry


@app.put(
    "/entries/{entry_id}",
    response_model=schemas.FoodEntry,
    dependencies=[Depends(get_current_user)],
)
def update_entry(
        entry_id: int,
        updates: schemas.FoodEntryUpdate,
        db: Session = Depends(get_db),
):
    """
    Update an existing entry.
    Input is validated against the Pydantic model `FoodEntryUpdate`.
    """
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
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_current_user)],
)
def delete_entry(
        entry_id: int,
        db: Session = Depends(get_db),
):
    """
    Delete an entry by its ID.
    """
    entry = db.query(models.FoodEntry).get(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(entry)
    db.commit()
    return
