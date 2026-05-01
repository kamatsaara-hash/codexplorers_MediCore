from fastapi import APIRouter
from app.schemas.appointment_schema import Appointment
from app.services.appointment_service import book_appointment

router = APIRouter()

@router.post("")
async def create_appointment(data: Appointment):
    return await book_appointment(data)