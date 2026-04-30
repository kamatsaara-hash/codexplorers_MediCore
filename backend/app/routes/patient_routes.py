from fastapi import APIRouter
from app.schemas.patient_schema import PatientSignup, PatientLogin
from app.services import patient_service

router = APIRouter()


# 👤 SIGNUP (MUST USE SERVICE)
@router.post("/signup")
def signup(data: PatientSignup):
    return patient_service.signup(data)


# 🔐 LOGIN
@router.post("/login")
def login(data: PatientLogin):
    return patient_service.login(data)