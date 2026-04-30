from app.ai_model.predictor import predict_disease
from app.config.database import doctor_collection
from app.services.appointment_service import get_daily_count


def get_prediction(symptoms: str):
    # 🧠 AI prediction
    result = predict_disease(symptoms)

    specialization = result.get("specialization")

    if not specialization:
        return {"error": "No specialization found"}

    # 📅 today's date (simple version)
    from datetime import datetime
    today = datetime.now().strftime("%Y-%m-%d")

    # 👨‍⚕️ find doctors of that specialization
    doctors = doctor_collection.find({"specialization": specialization})

    available_doctors = []

    for doc in doctors:
        doc_id = str(doc["_id"])
        count = get_daily_count(doc_id, today)

        if count < 10:
            available_doctors.append({
                "id": doc_id,
                "name": doc["name"],
                "specialization": doc["specialization"],
                "available_slots": 10 - count
            })

    # 🔁 sort by availability (best first)
    available_doctors.sort(key=lambda x: x["available_slots"], reverse=True)

    # 📦 final response
    return {
        "disease": result.get("disease"),
        "severity": result.get("severity"),
        "specialization": specialization,
        "recommended_doctors": available_doctors[:5]  # top 5
    }