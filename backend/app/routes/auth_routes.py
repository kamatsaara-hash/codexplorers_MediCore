from fastapi import APIRouter, HTTPException
from app.schemas.auth_schema import LoginSchema, SignupSchema
from app.services.auth_service import login_user, signup_patient

router = APIRouter()

@router.post("/login")
async def login(data: LoginSchema):
    user = await login_user(data)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

@router.post("/signup")
async def signup(data: SignupSchema):
    user = await signup_patient(data)
    if not user:
        raise HTTPException(status_code=400, detail="User exists")
    return user