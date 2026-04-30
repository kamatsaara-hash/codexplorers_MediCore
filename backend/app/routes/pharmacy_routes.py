from fastapi import APIRouter
from app.services import pharmacy_service

router = APIRouter()

@router.get("/")
def get_meds():
    return pharmacy_service.get_medicines()