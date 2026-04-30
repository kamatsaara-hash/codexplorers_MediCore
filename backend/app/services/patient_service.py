from app.config.database import patient_collection
from app.models.patient_model import patient_helper
from app.utils.hashing import hash_password, verify_password


# 👤 PATIENT SIGNUP
def signup(data):
    print("🔥 SIGNUP FUNCTION CALLED")   # 👈 ADD THIS

    patient = data.dict()
    patient["password"] = hash_password(patient["password"])

    print("HASHED PASSWORD:", patient["password"])  # 👈 ADD THIS

    patient_collection.insert_one(patient)

    return {"message": "Patient created"}


# 🔐 PATIENT LOGIN
def login(data):
    user = patient_collection.find_one({"email": data.email})

    if not user:
        return {"error": "User not found"}

    # 🔐 Verify password
    if verify_password(data.password, user["password"]):
        return {
            "message": "Login successful",
            "user": patient_helper(user)
        }

    return {"error": "Invalid password"}


# 📊 GET ALL PATIENTS (ADMIN USE)
def get_all_patients():
    patients = patient_collection.find()
    return [patient_helper(p) for p in patients]