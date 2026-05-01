from fastapi import APIRouter
from app.services.pharmacy_service import get_medicines

router = APIRouter()

@router.get("")
async def pharmacy():
    return await get_medicines()