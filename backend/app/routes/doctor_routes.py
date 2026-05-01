from fastapi import APIRouter
from app.config.database import doctors_collection

router = APIRouter()

@router.get("")
async def get_doctors():
    doctors = []

    async for doc in doctors_collection.find():
        doctor = {
            "id": str(doc["_id"]),
            "name": doc.get("name"),
            "email": doc.get("email"),
            "phone": doc.get("phone"),
            "specialization": doc.get("specialization"),
        }

        # 🔥 handle your DB structure
        count = doc.get("patients_today", doc.get("appointments", 0))

        doctor["patients_today"] = count
        doctor["available"] = count < 10

        doctors.append(doctor)

    return doctors