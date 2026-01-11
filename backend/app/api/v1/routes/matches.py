import uuid
import re
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.user import User

router = APIRouter()


def _fetch_user(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/")
def list_matches(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    teach_skills = {s.skill_name.lower() for s in current_user.skills if s.role == "teach"}
    learn_skills = {s.skill_name.lower() for s in current_user.skills if s.role == "learn"}

    if not teach_skills or not learn_skills:
        return []

    matches: List[dict] = []
    other_users = db.query(User).filter(User.id != current_user.id).all()
    for user in other_users:
        user_teach = [s for s in user.skills if s.role == "teach" and s.skill_name.lower() in learn_skills]
        user_learn = [s for s in user.skills if s.role == "learn" and s.skill_name.lower() in teach_skills]
        if not user_teach or not user_learn:
            continue

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


@router.post("/{match_id}/propose")
def propose_swap(match_id: str, current_user: User = Depends(get_current_user)):
    # Deterministic Jitsi link per match id so both sides share the same room.
    # Normalize by sorting user ids embedded in the match id, if present.
    ids = re.findall(r"\d+", match_id)
    if len(ids) >= 2:
        sorted_ids = sorted(ids[:2], key=int)
        slug = f"match-{sorted_ids[0]}-{sorted_ids[1]}"
    else:
        slug = "".join(ch for ch in match_id if ch.isalnum()) or uuid.uuid4().hex[:10]
    room_name = f"AppMeet-{slug}"
    meeting_link = f"https://meet.jit.si/{room_name}"
    return {"match_id": match_id, "meeting_link": meeting_link, "status": "proposed"}
