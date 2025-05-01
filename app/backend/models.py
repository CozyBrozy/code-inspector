from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, text, Index
from database import Base

class FoodEntry(Base):
    __tablename__ = "food_entries"
    id = Column(Integer, primary_key=True, index=True)
    meal_description = Column(String(255), nullable=False, comment="Beschreibung der Mahlzeit")
    calories = Column(Integer, nullable=False, comment="Kalorien in kcal")
    carbohydrates = Column(Float, nullable=False, comment="Kohlenhydrate in Gramm")
    protein = Column(Float, nullable=False, comment="Protein in Gramm")
    fat = Column(Float, nullable=False, comment="Fett in Gramm")
    created_at = Column(TIMESTAMP(6), nullable=False, server_default=text("CURRENT_TIMESTAMP(6)"))
    meal_time = Column(TIMESTAMP(6), nullable=True, default=None)

    __table_args__ = (
        Index("idx_food_entries_meal_description", "meal_description"),
        {"comment": "Tabelle für Ernährungstagebuch-Einträge"},
    )
