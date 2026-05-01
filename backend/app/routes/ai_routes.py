from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.schemas.ai_schema import SymptomRequest
from app.services.ai_service import process_symptoms
from app.services.pdf_service import generate_pdf

router = APIRouter()


# ---------------------------------------
# 🧠 AI PREDICTION
# ---------------------------------------
@router.post("/predict")
async def predict(data: SymptomRequest):
    return await process_symptoms(data.symptoms)


# ---------------------------------------
# 📄 PDF REPORT
# ---------------------------------------
@router.post("/report")
async def generate_report(data: dict):
    if "symptoms" not in data:
        raise HTTPException(status_code=400, detail="Symptoms required")

    result = await process_symptoms(data["symptoms"])

    pdf_data = {
        "name": data.get("name", "Patient"),
        "symptoms": data["symptoms"],
        "disease": result["disease"],
        "severity": result["severity"],
        "confidence": result.get("confidence", "N/A"),
        "specialization": result["recommended_specialization"]
    }

    file = generate_pdf(pdf_data)

    return FileResponse(file, media_type="application/pdf", filename="medical_report.pdf")