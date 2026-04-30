from fastapi import Header, HTTPException
import os
from dotenv import load_dotenv

load_dotenv()

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


# 🔐 Simple Admin Protection (Header-based)
def verify_admin(email: str = Header(None), password: str = Header(None)):
    if email != ADMIN_EMAIL or password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized Admin")


# 🔐 Simple Role Check (for future use)
def verify_role(role: str, expected_role: str):
    if role != expected_role:
        raise HTTPException(status_code=403, detail="Access denied")