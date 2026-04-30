from fastapi import APIRouter, Depends
from app.core.security import verify_admin
from app.services import doctor_service, patient_service, admin_service

router = APIRouter()


@router.get("/doctors")
def get_all_doctors(admin=Depends(verify_admin)):
    return doctor_service.get_all_doctors()


@router.get("/patients")
def get_all_patients(admin=Depends(verify_admin)):
    return patient_service.get_all_patients()


# 📊 NEW ANALYTICS
@router.get("/doctor-status")
def doctor_status(admin=Depends(verify_admin)):
    return admin_service.get_doctor_status()