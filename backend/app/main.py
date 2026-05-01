from fastapi import FastAPI
from app.routes import auth_routes, ai_routes, appointment_routes, doctor_routes, admin_routes, pharmacy_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],  # IMPORTANT (enables OPTIONS)
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/auth")
app.include_router(ai_routes.router, prefix="/ai")
app.include_router(appointment_routes.router, prefix="/appointments")
app.include_router(doctor_routes.router, prefix="/doctors")
app.include_router(admin_routes.router, prefix="/admin")
app.include_router(pharmacy_routes.router, prefix="/pharmacy")