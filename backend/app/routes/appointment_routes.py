from fastapi import APIRouter
from app.schemas.appointment_schema import AppointmentCreate
from app.services import appointment_service

router = APIRouter()

@router.post("/")
def book(data: AppointmentCreate):
    return appointment_service.book_appointment(data)