import os
from functools import lru_cache
from pathlib import Path


def _load_env_file():
    """
    Simple .env loader so local variables are picked up without extra deps.
    Looks for ../.env relative to this file (project root).
    """
    env_path = Path(__file__).resolve().parents[2] / ".env"
    if not env_path.exists():
        return
    for line in env_path.read_text().splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


_load_env_file()


class Settings:
    def __init__(self) -> None:
        self.database_url: str = os.getenv(
            "DATABASE_URL",
            "postgresql+psycopg://skillfindr:password@localhost:5433/skillfindr",
        )
        self.jwt_secret: str = os.getenv("JWT_SECRET", "change-me")
        self.jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
        self.jwt_exp_minutes: int = int(os.getenv("JWT_EXP_MINUTES", "1440"))


@lru_cache()
def get_settings() -> Settings:
    return Settings()
