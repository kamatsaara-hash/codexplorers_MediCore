from fastapi import APIRouter
from app.services import doctor_service

router = APIRouter()

@router.get("/")
def get_doctors():
    return doctor_service.get_all_doctors()