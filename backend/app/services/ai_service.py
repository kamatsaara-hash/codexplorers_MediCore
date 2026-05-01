from app.ai_model.predictor import predict_disease, get_severity, get_specialization
from app.services.doctor_service import get_doctors_by_specialization

async def process_symptoms(symptoms: str):
    disease, confidence = predict_disease(symptoms)

    severity = get_severity(disease, symptoms)
    specialization = get_specialization(disease)

    doctors = await get_doctors_by_specialization(specialization)

    return {
        "disease": disease,
        "confidence": confidence,
        "severity": severity,
        "recommended_specialization": specialization,
        "recommended_doctors": doctors
    }