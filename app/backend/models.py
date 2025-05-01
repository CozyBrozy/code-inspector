from sqlalchemy import Column, Integer, String, Float, DateTime, func
from sqlalchemy.orm import declarative_base
import datetime

Base = declarative_base()

class FoodEntry(Base):

    # Modell für einen Ernährungstagebuch-Eintrag.

    __tablename__ = "food_entries"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    meal_description = Column(String(255), index=True, nullable=False, comment="Beschreibung der Mahlzeit")
    calories = Column(Integer, nullable=False, comment="Kalorien in kcal")
    carbohydrates = Column(Float, nullable=False, comment="Kohlenhydrate in Gramm")
    protein = Column(Float, nullable=False, comment="Protein in Gramm")
    fat = Column(Float, nullable=False, comment="Fett in Gramm")
    # Zeitstempel, wann der Eintrag erstellt wurde
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    # Optional: Zeitstempel für die Mahlzeit, falls abweichend vom Eintragungszeitpunkt
    meal_time = Column(DateTime(timezone=True), default=datetime.datetime.utcnow)

    def __repr__(self):
        return (f"<FoodEntry(id={self.id}, meal='{self.meal_description}', "
                f"kcal={self.calories}, carbs={self.carbohydrates}, "
                f"protein={self.protein}, fat={self.fat})>")

    # Beispiel für eine Funktion, die alle Tabellen erstellt (NUR für erste Tests, wird durch Liquibase ersetzt!)
    def create_tables(engine_to_use):
        """Erstellt alle Tabellen, die von Base erben."""
        print("INFO: Attempting to create tables...")
        try:
            Base.metadata.create_all(bind=engine_to_use)
            print("INFO: Tables created successfully (if they didn't exist).")
        except Exception as e:
            print(f"ERROR: Could not create tables: {e}")