from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.session import get_db
from app.models.user import User
from app.models.userskill import UserSkill
from app.models.availability import Availability
from app.schemas.auth import SignupRequest, LoginRequest, TokenResponse, UserRead

router = APIRouter()


@router.post("/signup", response_model=TokenResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=get_password_hash(payload.password),
    )
    db.add(user)
    # Save skills and availability
    for s in payload.teach:
        db.add(UserSkill(user=user, skill_name=s.name, role="teach", level=s.level, goal=s.goal))
    for s in payload.learn:
        db.add(UserSkill(user=user, skill_name=s.name, role="learn", level=s.level, goal=s.goal))
    for a in payload.availability:
        db.add(Availability(user=user, day=a.day, start_time=a.start, end_time=a.end, timezone=a.timezone))
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Could not create user")
    db.refresh(user)

    token = create_access_token(subject=str(user.id))
    return TokenResponse(access_token=token, user=UserRead.from_orm(user))


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(subject=str(user.id))
    return TokenResponse(access_token=token, user=UserRead.from_orm(user))
