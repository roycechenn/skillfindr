from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext


router = APIRouter()
# Use a pure-Python hash to avoid external bcrypt backend issues in this environment.
pwd_ctx = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


class SignupPayload(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)
    teach: list[dict] = Field(default_factory=list)
    learn: list[dict] = Field(default_factory=list)
    availability: list[dict] = Field(default_factory=list)


@router.post("/signup")
async def signup(payload: SignupPayload):
    # TODO: replace with real persistence (database) and duplicate email checks.
    hashed_password = pwd_ctx.hash(payload.password)
    if not hashed_password:
        raise HTTPException(status_code=500, detail="Failed to hash password")

    # Issue a placeholder token until JWT is wired up.
    token = "mock-jwt-token"
    user = {"name": payload.name, "email": payload.email}

    return {"token": token, "user": user}
