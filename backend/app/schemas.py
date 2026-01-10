

class UpsertUserRequest(BaseModel):
    name: str | None = None
    email: str
    teach_skill: str
    learn_skill: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    teach_skill: str
    learn_skill: str

class MatchRequest(BaseModel):
    user_id: int

class MatchResponse(BaseModel):
    user_id: int
    partner_user_id: int
    meet_link: str
