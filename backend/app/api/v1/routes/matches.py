from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_matches():
    # TODO: implement real matching logic and return ranked partners.
    return []
