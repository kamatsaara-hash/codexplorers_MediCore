import os
from dotenv import load_dotenv
from app.config.database import doctor_collection
from app.utils.hashing import verify_password

load_dotenv()


# 🛠 ADMIN LOGIN
def admin_login(data):
    if data.email == os.getenv("ADMIN_EMAIL") and data.password == os.getenv("ADMIN_PASSWORD"):
        return {"message": "Admin login success"}
    return {"error": "Invalid admin credentials"}


# 🧑‍⚕️ DOCTOR LOGIN
def doctor_login(data):
    doctor = doctor_collection.find_one({"email": data.email})

    if doctor and verify_password(data.password, doctor["password"]):
        return {
            "message": "Doctor login successful",
            "doctor_id": str(doctor["_id"]),
            "name": doctor["name"],
            "specialization": doctor["specialization"]
        }

    return {"error": "Invalid credentials"}