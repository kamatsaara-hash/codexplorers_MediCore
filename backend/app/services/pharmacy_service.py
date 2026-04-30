from app.config.database import pharmacy_collection
from app.models.pharmacy_model import pharmacy_helper

def get_medicines():
    meds = pharmacy_collection.find()
    return [pharmacy_helper(m) for m in meds]