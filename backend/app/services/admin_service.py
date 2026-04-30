from app.config.database import doctor_collection
from app.services.appointment_service import get_daily_count
from datetime import datetime


def get_doctor_status():
    today = datetime.now().strftime("%Y-%m-%d")

    doctors = doctor_collection.find()
    result = []

    for doc in doctors:
        doc_id = str(doc["_id"])
        count = get_daily_count(doc_id, today)

        status = "available"
        if count >= 10:
            status = "full"
        elif count == 0:
            status = "available"

        result.append({
            "id": doc_id,
            "name": doc["name"],
            "specialization": doc["specialization"],
            "appointments_today": count,
            "status": status
        })

    return result