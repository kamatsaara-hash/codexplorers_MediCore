from fastapi import APIRouter
from app.schemas.ai_schema import SymptomInput
from app.services import ai_service, pdf_service

router = APIRouter()


@router.post("/predict")
def predict(data: SymptomInput):
    return ai_service.get_prediction(data.symptoms)


@router.post("/report")
def generate_report(data: dict):
    result = ai_service.get_prediction(data["symptoms"])

    pdf_data = {
        "name": data.get("name", "Patient"),
        "symptoms": data["symptoms"],
        "disease": result["disease"],
        "severity": result["severity"],
        "specialization": result["specialization"]
    }

    file = pdf_service.generate_pdf(pdf_data)

    return {"message": "PDF generated", "file": file}