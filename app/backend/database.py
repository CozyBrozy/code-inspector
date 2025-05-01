import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# --- Datenbank-Konfiguration ---
DB_TYPE = os.getenv("DB_TYPE", "mysql") # 'sqlite' oder 'mysql'
DB_USER = os.getenv("user")
DB_PASSWORD = os.getenv("password")
DB_HOST = os.getenv("MYSQL_HOST", "localhost") # Wird später der Docker-Service-Name sein
DB_PORT = os.getenv("MYSQL_PORT", "3306")
DB_NAME = os.getenv("food_diary_db")

# --- SQLAlchemy Verbindungs-URL ---
if DB_TYPE == "mysql":
    if not all([DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME]):
        raise ValueError("Für MySQL müssen MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE gesetzt sein.")
    # Verwende mysql+mysqlconnector als Treiber
    SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    ENGINE_OPTIONS = {}
elif DB_TYPE == "sqlite":
    # Standardmäßig eine SQLite-Datei im Projektverzeichnis
    SQLALCHEMY_DATABASE_URL = "sqlite:///./food_diary.db"
    # Spezifische Argumente für SQLite
    ENGINE_OPTIONS = {"connect_args": {"check_same_thread": False}}
else:
    raise ValueError(f"Unbekannter DB_TYPE: {DB_TYPE}. Unterstützt werden 'sqlite' und 'mysql'.")

print(f"INFO: Connecting to backend: {SQLALCHEMY_DATABASE_URL.split('@')[0]}...") # Passwort nicht loggen

# --- SQLAlchemy Engine und Session ---
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    **ENGINE_OPTIONS
)

# Konfiguriert eine Session-Factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- Dependency für FastAPI
def get_db():
    """
    Dependency function to get a backend session.
    Ensures the session is always closed after the request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()