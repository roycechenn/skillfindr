from fastapi import APIRouter

from app.api.v1.routes import health, auth, matches

router = APIRouter()
router.include_router(health.router)
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(matches.router, prefix="/matches", tags=["matches"])
