from app.config.database import appointment_collection, doctor_collection
from bson import ObjectId


# 📅 GET APPOINTMENT COUNT FOR A DOCTOR ON A DATE
def get_daily_count(doctor_id: str, date: str):
    return appointment_collection.count_documents({
        "doctor_id": doctor_id,
        "date": date
    })


# 🔁 FIND ALTERNATIVE DOCTOR
def find_available_doctor(specialization: str, date: str):
    doctors = doctor_collection.find({"specialization": specialization})

    for doc in doctors:
        doc_id = str(doc["_id"])   # ✅ convert ObjectId → string
        count = get_daily_count(doc_id, date)

        if count < 10:
            return doc

    return None


# 📅 BOOK APPOINTMENT (FINAL LOGIC)
def book_appointment(data):
    # ✅ FIXED INDENTATION
    doctor = doctor_collection.find_one({"_id": ObjectId(data.doctor_id)})

    if not doctor:
        return {"error": "Doctor not found"}

    date = data.date
    doctor_id = data.doctor_id

    # 🔢 Count today's appointments
    count = get_daily_count(doctor_id, date)

    # ❌ If full → suggest another doctor
    if count >= 10:
        alt_doc = find_available_doctor(doctor["specialization"], date)

        if alt_doc:
            return {
                "error": "Doctor full",
                "suggested_doctor": {
                    "id": str(alt_doc["_id"]),
                    "name": alt_doc["name"]
                }
            }

        return {"error": "No doctors available"}

    # ✅ Book appointment
    appointment = data.dict()
    appointment_collection.insert_one(appointment)

    return {"message": "Appointment booked successfully"}