from app.config.database import appointments_collection, doctors_collection
from bson import ObjectId

async def book_appointment(data):
    doctor = await doctors_collection.find_one({"_id": ObjectId(data.doctor_id)})

    if not doctor:
        return None

    count = doctor.get("patients_today", doctor.get("appointments", 0))

    if count >= 10:
        return {"status": "full"}

    await appointments_collection.insert_one(data.dict())

    # 🔥 FIX: update appointments field on the doctor
    await doctors_collection.update_one(
        {"_id": ObjectId(data.doctor_id)},
        {"$inc": {"appointments": 1, "patients_today": 1}}
    )

    return {"status": "booked"}