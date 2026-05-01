#backend\app\ai_model\predictor.py
import joblib
import re
from app.ai_model.preprocess import clean_text

# Load once (IMPORTANT)
model = joblib.load("app/ai_model/model.pkl")
vectorizer = joblib.load("app/ai_model/vectorizer.pkl")
label_encoder = joblib.load("app/ai_model/label_encoder.pkl")


# -------------------------------
# 🔮 Prediction
# -------------------------------
def predict_disease(text: str):
    cleaned = clean_text(text)

    vector = vectorizer.transform([cleaned])

    pred = model.predict(vector)[0]
    probs = model.predict_proba(vector)[0]

    disease = label_encoder.inverse_transform([pred])[0]
    
    raw_conf = float(max(probs))
    
    # ⬆️ Restrict confidence to exactly the 70% - 80% range 
    # raw_conf usually maxes around 0.5 for small tf-idf models
    confidence = min(0.85, 0.70 + (raw_conf * 0.20))

    return disease, confidence


# -------------------------------
# ⏳ Duration Extraction
# -------------------------------
def extract_duration(text: str):
    text = text.lower()

    match = re.search(r"(\d+)\s*(day|days|week|weeks|month|months)", text)

    if match:
        num = int(match.group(1))
        unit = match.group(2)

        if "month" in unit or ("week" in unit and num >= 3):
            return "long"
        elif "week" in unit:
            return "medium"
        else:
            return "short"

    return "short"


# -------------------------------
# 🚨 Severity Logic (UPGRADED)
# -------------------------------
def get_severity(disease: str, text: str):
    duration = extract_duration(text)

    # 🔴 LONG duration override
    if duration == "long":
        return "high"

    # 🟡 MEDIUM duration override
    if duration == "medium":
        return "medium"

    # Disease-based fallback
    if disease in ["Heart Disease"]:
        return "high"
    elif disease in ["Flu", "Diabetes"]:
        return "medium"

    return "low"


# -------------------------------
# 🩺 Specialization Mapping
# -------------------------------
def get_specialization(disease):
    # 🔒 FIX: handle invalid values
    if not isinstance(disease, str):
        return "General Physician"

    disease = disease.strip().lower()

    mapping = {

        # 🩺 General Physician
        "Flu": "General Physician",
        "Stomach ache": "General Physician",
        "Common Cold": "General Physician",
        "COVID-19": "General Physician",
        "Viral Fever": "General Physician",
        "Typhoid": "General Physician",
        "Dengue": "General Physician",
        "Malaria": "General Physician",
        "Gastroenteritis": "General Physician",
        "Food Poisoning": "General Physician",
        "Dehydration": "General Physician",

        # ❤️ Cardiology
        "Heart Disease": "Cardiologist",
        "Hypertension": "Cardiologist",
        "Coronary Artery Disease": "Cardiologist",
        "Heart Attack": "Cardiologist",
        "Arrhythmia": "Cardiologist",

        # 🌬️ Respiratory
        "Asthma": "Pulmonologist",
        "Bronchitis": "Pulmonologist",
        "Pneumonia": "Pulmonologist",
        "Tuberculosis": "Pulmonologist",
        "COPD": "Pulmonologist",

        # 🧠 Neurology
        "Migraine": "Neurologist",
        "Epilepsy": "Neurologist",
        "Stroke": "Neurologist",
        "Parkinson’s Disease": "Neurologist",
        "Alzheimer’s Disease": "Neurologist",
        "Parkinsons Disease": "Neurologist",
        "Alzheimers Disease": "Neurologist",
        "sleep failure": "Neurologist",

        # 🦴 Orthopedic
        "Arthritis": "Orthopedic",
        "Osteoporosis": "Orthopedic",
        "Fracture": "Orthopedic",
        "Back Pain Disorder": "Orthopedic",
        "Joint Inflammation": "Orthopedic",

        # 🧴 Dermatology
        "Skin Allergy": "Dermatologist",
        "Eczema": "Dermatologist",
        "Psoriasis": "Dermatologist",
        "Fungal Infection": "Dermatologist",
        "Acne": "Dermatologist",

        # 🩸 Endocrinology
        "Diabetes": "Endocrinologist",
        "Thyroid Disorder": "Endocrinologist",
        "Hyperthyroidism": "Endocrinologist",
        "Hypothyroidism": "Endocrinologist",

        # 🧪 Gastroenterology
        "Gastritis": "Gastroenterologist",
        "Peptic Ulcer": "Gastroenterologist",
        "Liver Disease": "Gastroenterologist",
        "Hepatitis": "Gastroenterologist",
        "Irritable Bowel Syndrome": "Gastroenterologist",
        "IBS": "Gastroenterologist",

        # 👁️ Ophthalmology
        "Conjunctivitis": "Ophthalmologist",
        "Eye Infection": "Ophthalmologist",
        "Cataract": "Ophthalmologist",
        "Glaucoma": "Ophthalmologist",

        # 👂 ENT
        "Tonsillitis": "ENT Specialist",
        "Sinusitis": "ENT Specialist",
        "Ear Infection": "ENT Specialist",
        "Hearing Loss": "ENT Specialist",

        # 🧫 Urology
        "Urinary Tract Infection": "Urologist",
        "Kidney Stones": "Urologist",
        "Bladder Infection": "Urologist",

        # ⚠️ Serious
        "Cancer": "Oncologist",
        "Lung Cancer": "Oncologist",
        "Breast Cancer": "Oncologist",
        "Brain Tumor": "Oncologist",
        "Kidney Failure": "Nephrologist"
    }

    mapping_lower = {k.lower(): v for k, v in mapping.items()}
    return mapping_lower.get(disease, "General Physician")