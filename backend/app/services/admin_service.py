from app.config.database import (
    doctors_collection,
    patients_collection,
    appointments_collection,
    pharmacy_collection
)
from bson import ObjectId


# ---------------------------------------
# 📊 ADMIN OVERVIEW
# ---------------------------------------
async def get_admin_overview():
    total_doctors = await doctors_collection.count_documents({})
    total_patients = await patients_collection.count_documents({})
    total_appointments = await appointments_collection.count_documents({})

    available = 0
    full = 0

    async for doc in doctors_collection.find():
        # 🔥 FIX: support both fields
        count = doc.get("patients_today", doc.get("appointments", 0))

        if count < 10:
            available += 1
        else:
            full += 1

    return {
        "totals": {
            "doctors": total_doctors,
            "patients": total_patients,
            "appointments": total_appointments
        },
        "system_status": {
            "available_doctors": available,
            "full_doctors": full
        }
    }


# ---------------------------------------
# 👨‍⚕️ ALL DOCTORS (WITH STATUS)
# ---------------------------------------
async def get_all_doctors():
    doctors = []

    async for doc in doctors_collection.find():
        # 🔥 FIX: create clean response object
        doctor = {
            "id": str(doc["_id"]),
            "name": doc.get("name"),
            "email": doc.get("email"),
            "phone": doc.get("phone"),
            "specialization": doc.get("specialization"),
        }

        # 🔥 handle your DB schema
        count = doc.get("patients_today", doc.get("appointments", 0))

        doctor["patients_today"] = count
        doctor["available"] = count < 10
        doctor["status"] = "available" if count < 10 else "full"

        doctors.append(doctor)

    return doctors


# ---------------------------------------
# 🧑‍🤝‍🧑 PATIENTS GROUPED BY DOCTOR
# ---------------------------------------
async def get_patients_grouped_by_doctor():
    result = []

    async for doctor in doctors_collection.find():
        doctor_id = str(doctor["_id"])
        patients = []

        async for appt in appointments_collection.find({"doctor_id": doctor_id}):

            # ✅ SAFE ACCESS
            patient_email = appt.get("patient_email")

            if not patient_email:
                continue

            patient = await patients_collection.find_one(
                {"email": patient_email}
            )

            if patient:
                clean_patient = {
                    "id": str(patient["_id"]),
                    "name": patient.get("name"),
                    "email": patient.get("email"),
                    "phone": patient.get("phone"),
                    "age": patient.get("age"),
                    "gender": patient.get("gender")
                }

                patients.append(clean_patient)

        result.append({
            "doctor_id": doctor_id,
            "doctor_name": doctor.get("name"),
            "doctor_email": doctor.get("email"),
            "specialization": doctor.get("specialization"),
            "patients": patients
        })

    return result


# ---------------------------------------
# 💊 PHARMACY (READ ONLY)
# ---------------------------------------
async def get_pharmacy_data():
    medicines = []

    async for med in pharmacy_collection.find():
        medicine = {
            "id": str(med["_id"]),
            "medicine_name": med.get("medicine_name"),
            "quantity": med.get("quantity")
        }

        medicines.append(medicine)

    return medicines


# ---------------------------------------
# 📈 DOCTOR WORKLOAD
# ---------------------------------------
async def get_doctor_workload():
    data = []

    async for doc in doctors_collection.find():
        # 🔥 FIX
        count = doc.get("patients_today", doc.get("appointments", 0))

        data.append({
            "doctor_id": str(doc["_id"]),
            "name": doc["name"],
            "specialization": doc["specialization"],
            "patients_today": count,
            "max_per_day": 10,
            "available": count < 10
        })

    return data