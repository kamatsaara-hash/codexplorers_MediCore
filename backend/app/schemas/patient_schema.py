from pydantic import BaseModel

class Patient(BaseModel):
    name: str
    email: str
    phone: str
    age: int
    gender: str
    password: str