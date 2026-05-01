from pydantic import BaseModel

class Doctor(BaseModel):
    name: str
    email: str
    phone: str
    specialization: str
    password: str
    patients_today: int = 0