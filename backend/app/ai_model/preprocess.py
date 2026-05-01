#backend\app\ai_model\preprocess.py
import re

def clean_text(text: str) -> str:
    text = text.lower()
    
    # keep numbers for duration detection (IMPORTANT)
    text = re.sub(r"[^a-z0-9\s]", "", text)
    
    return text.strip()