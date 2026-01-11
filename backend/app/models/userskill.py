from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.models.base import Base


class UserSkill(Base):
    __tablename__ = "user_skills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_name = Column(String(255), nullable=False, index=True)
    role = Column(String(10), nullable=False)  # "teach" or "learn"
    level = Column(String(50), nullable=True)
    goal = Column(String(255), nullable=True)

    user = relationship("User", back_populates="skills")
