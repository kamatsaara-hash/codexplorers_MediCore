import re


# ---------------------------------------
# 📧 EMAIL VALIDATION
# ---------------------------------------
def is_valid_email(email: str) -> bool:
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None


# ---------------------------------------
# 📱 PHONE VALIDATION
# ---------------------------------------
def is_valid_phone(phone: str) -> bool:
    # Simple validation: 10 digits
    return phone.isdigit() and len(phone) == 10


# ---------------------------------------
# 🔐 PASSWORD VALIDATION
# ---------------------------------------
def is_strong_password(password: str) -> bool:
    # Minimum 6 chars (you can upgrade later)
    return len(password) >= 6


# ---------------------------------------
# 🧠 SYMPTOM INPUT VALIDATION
# ---------------------------------------
def is_valid_symptom_text(text: str) -> bool:
    return isinstance(text, str) and len(text.strip()) > 3


# ---------------------------------------
# 📅 DATE VALIDATION (basic)
# ---------------------------------------
def is_valid_date(date: str) -> bool:
    # Format: YYYY-MM-DD
    pattern = r"^\d{4}-\d{2}-\d{2}$"
    return re.match(pattern, date) is not None