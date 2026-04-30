from pydantic import BaseModel

class PatientSignup(BaseModel):
    name: str
    email: str
    phone: str
    age: int
    gender: str
    password: str

class PatientLogin(BaseModel):
    email: str
    password: str