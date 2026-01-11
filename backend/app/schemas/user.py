from typing import Optional
from pydantic import BaseModel, Field


class SkillPayload(BaseModel):
    name: str = Field(..., min_length=1)
    level: Optional[str] = None
    goal: Optional[str] = None


class AvailabilityPayload(BaseModel):
    day: str
    start: str
    end: str
    timezone: str = "UTC"


class UserRead(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True
