from app.config.database import doctor_collection
from app.models.doctor_model import doctor_helper

def get_all_doctors():
    doctors = doctor_collection.find()
    return [doctor_helper(doc) for doc in doctors]