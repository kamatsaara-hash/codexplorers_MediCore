from fastapi import FastAPI
from app.routes import (
    patient_routes,
    doctor_routes,
    admin_routes,
    appointment_routes,
    pharmacy_routes,
    ai_routes,
    auth_routes   # ✅ ADD THIS
)

app = FastAPI()

# 🔐 AUTH ROUTES (LOGIN)
app.include_router(auth_routes.router, prefix="/auth")

# 👤 PATIENT
app.include_router(patient_routes.router, prefix="/patient")

# 🧑‍⚕️ DOCTOR
app.include_router(doctor_routes.router, prefix="/doctor")

# 🛠 ADMIN
app.include_router(admin_routes.router, prefix="/admin")

# 📅 APPOINTMENTS
app.include_router(appointment_routes.router, prefix="/appointment")

# 💊 PHARMACY
app.include_router(pharmacy_routes.router, prefix="/pharmacy")

# 🧠 AI
app.include_router(ai_routes.router, prefix="/ai")


@app.get("/")
def root():
    return {"message": "Hospital API running"}