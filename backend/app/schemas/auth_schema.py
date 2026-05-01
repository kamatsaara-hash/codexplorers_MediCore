from pydantic import BaseModel

class LoginSchema(BaseModel):
    email: str
    password: str
    role: str  # admin / doctor / patient

class SignupSchema(BaseModel):
    name: str
    email: str
    phone: str
    age: int
    gender: str
    password: str