from typing import List
from pydantic import BaseModel, EmailStr, Field

from app.schemas.user import UserRead, SkillPayload, AvailabilityPayload


class SignupRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)
    teach: List[SkillPayload] = Field(default_factory=list)
    learn: List[SkillPayload] = Field(default_factory=list)
    availability: List[AvailabilityPayload] = Field(default_factory=list)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserRead
