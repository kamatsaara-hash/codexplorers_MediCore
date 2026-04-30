from pydantic import BaseModel

class DoctorLogin(BaseModel):
    email: str
    password: str