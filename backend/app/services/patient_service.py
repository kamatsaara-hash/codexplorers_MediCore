from fastapi import HTTPException
from app.config.database import patient_collection
from app.utils.hashing import hash_password, verify_password


# 👤 PATIENT SIGNUP
def signup(data):
    patient = data.dict()

    # 🔒 check if email already exists (recommended)
    existing = patient_collection.find_one({"email": patient.get("email")})
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # 🔐 hash password
    patient["password"] = hash_password(patient["password"])

    patient_collection.insert_one(patient)

    return {"message": "Patient created successfully"}


# 🔐 PATIENT LOGIN
def login(data):
    user = patient_collection.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "id": str(user["_id"]),   # 🔥 REQUIRED for booking + mapping
        "name": user.get("name"),
        "email": user.get("email"),
        "role": "patient"
    }


# 📊 GET ALL PATIENTS
def get_all_patients():
    patients = list(patient_collection.find())

    return [
        {
            "_id": str(p["_id"]),   # 🔥 REQUIRED for matching with appointments
            "name": p.get("name"),
            "email": p.get("email"),
            "phone": p.get("phone", "")
        }
        for p in patients
    ]