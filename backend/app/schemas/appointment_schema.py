from pydantic import BaseModel

class Appointment(BaseModel):
    doctor_id: str
    patient_email: str
    date: str