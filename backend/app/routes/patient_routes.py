from fastapi import APIRouter
from app.schemas.patient_schema import PatientSignup, PatientLogin
from app.services import patient_service

router = APIRouter()


# 👤 SIGNUP
@router.post("/signup")
def signup(data: PatientSignup):
    return patient_service.signup(data)


# 🔐 LOGIN
@router.post("/login")
def login(data: PatientLogin):
    return patient_service.login(data)


# 🔥 ADD THIS (CRITICAL FIX)
@router.get("/")
def get_all_patients():
    return patient_service.get_all_patients()