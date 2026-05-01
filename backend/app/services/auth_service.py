import os
from app.config.database import patients_collection, doctors_collection
from app.utils.hashing import verify_password, hash_password
from dotenv import load_dotenv

load_dotenv()

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


async def login_user(data):
    # ---------------- ADMIN ----------------
    if data.role == "admin":
        if data.email == ADMIN_EMAIL and data.password == ADMIN_PASSWORD:
            return {
                "role": "admin",
                "email": data.email,
                "name": "Admin"
            }
        return None

    # ---------------- DB USERS ----------------
    if data.role == "doctor":
        user = await doctors_collection.find_one({"email": data.email})
    else:
        user = await patients_collection.find_one({"email": data.email})

    if not user:
        return None

    # verify password
    if not verify_password(data.password, user["password"]):
        return None

    # 🔥 FIX: CLEAN RESPONSE (NO ObjectId)
    return {
        "role": data.role,
        "email": user["email"],
        "name": user.get("name", "User")
    }


async def signup_patient(data):
    existing = await patients_collection.find_one({"email": data.email})
    if existing:
        return None

    patient = data.dict()
    patient["password"] = hash_password(data.password)

    await patients_collection.insert_one(patient)
    patient["_id"] = str(patient["_id"])
    del patient["password"]
    return patient