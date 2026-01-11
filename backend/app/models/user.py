from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.models.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    skills = relationship("UserSkill", back_populates="user", cascade="all, delete-orphan")
    availability = relationship("Availability", back_populates="user", cascade="all, delete-orphan")
