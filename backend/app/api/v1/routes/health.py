from fastapi import APIRouter

router = APIRouter()


@router.get("/health", summary="Readiness check")
async def readiness():
    return {"status": "ok"}
