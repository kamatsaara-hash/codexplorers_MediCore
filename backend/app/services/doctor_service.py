from app.config.database import doctors_collection

async def get_doctors_by_specialization(spec):
    doctors = []

    async for doc in doctors_collection.find({"specialization": spec}):
        # 🔥 FIX: convert ObjectId
        doc["id"] = str(doc["_id"])

        # remove MongoDB internal field
        doc.pop("_id", None)

        # 🔐 remove password
        doc.pop("password", None)

        # 🔥 FIX: support your DB schema
        count = doc.get("patients_today", doc.get("appointments", 0))

        doc["patients_today"] = count
        doc["available"] = count < 10

        doctors.append(doc)

    return doctors