from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FoodEntryBase(BaseModel):
    meal_description: str
    calories: int
    carbohydrates: float
    protein: float
    fat: float
    meal_time: Optional[datetime] = None

class FoodEntryCreate(FoodEntryBase):
    pass

class FoodEntryUpdate(BaseModel):
    meal_description: Optional[str] = None
    calories: Optional[int] = None
    carbohydrates: Optional[float] = None
    protein: Optional[float] = None
    fat: Optional[float] = None
    meal_time: Optional[datetime] = None

class FoodEntry(FoodEntryBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
