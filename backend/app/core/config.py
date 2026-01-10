import os
from dataclasses import dataclass


@dataclass
class Settings:
    database_url: str = os.getenv("DATABASE_URL", "postgresql://skillfindr:password@localhost:5432/skillfindr")
    google_client_id: str = os.getenv("GOOGLE_CLIENT_ID", "")
    google_client_secret: str = os.getenv("GOOGLE_CLIENT_SECRET", "")
    jwt_secret: str = os.getenv("JWT_SECRET", "change-me")
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    backend_url: str = os.getenv("BACKEND_URL", "http://localhost:8000")


settings = Settings()
