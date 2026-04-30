from fastapi import APIRouter
from app.schemas.patient_schema import PatientLogin
from app.schemas.doctor_schema import DoctorLogin
from app.schemas.auth_schema import AdminLogin
from app.services import patient_service, auth_service

router = APIRouter()


# 👤 PATIENT LOGIN
@router.post("/patient-login")
def patient_login(data: PatientLogin):
    return patient_service.login(data)


# 🧑‍⚕️ DOCTOR LOGIN
@router.post("/doctor-login")
def doctor_login(data: DoctorLogin):
    return auth_service.doctor_login(data)


# 🛠 ADMIN LOGIN
@router.post("/admin-login")
def admin_login(data: AdminLogin):
    return auth_service.admin_login(data)