from collections import defaultdict
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.models.userskill import UserSkill

router = APIRouter()


def _fetch_user(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/")
def list_matches(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Build teach/learn sets for current user
    teach_skills = {s.skill_name.lower() for s in current_user.skills if s.role == "teach"}
    learn_skills = {s.skill_name.lower() for s in current_user.skills if s.role == "learn"}

    if not teach_skills or not learn_skills:
        return []

    # Fetch other users with overlapping skills
    # Simple heuristic: reciprocal teach/learn intersection
    matches: List[dict] = []
    other_users = db.query(User).filter(User.id != current_user.id).all()
    for user in other_users:
        user_teach = [s for s in user.skills if s.role == "teach" and s.skill_name.lower() in learn_skills]
        user_learn = [s for s in user.skills if s.role == "learn" and s.skill_name.lower() in teach_skills]
        if not user_teach or not user_learn:
            continue

        # Basic compatibility score: count of reciprocal skills
        score = min(len(user_teach), len(user_learn)) * 25
        score = max(50, min(score, 100))

        matches.append(
            {
                "id": f"match-{current_user.id}-{user.id}",
                "compatibility": score,
                "overlapMinutes": 60,
                "sharedGoals": [s.goal for s in user_teach + user_learn if s.goal] if user_teach or user_learn else [],
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "location": "Remote",
                    "rating": None,
                    "reviews": None,
                    "teach": [{"name": s.skill_name, "level": s.level} for s in user_teach],
                    "learn": [{"name": s.skill_name, "level": s.level} for s in user_learn],
                    "availability": [
                        {
                            "day": a.day,
                            "start": a.start_time,
                            "end": a.end_time,
                            "timezone": a.timezone,
                        }
                        for a in user.availability
                    ],
                },
            }
        )

    return matches
