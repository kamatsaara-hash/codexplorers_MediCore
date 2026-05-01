import hashlib
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -------------------------
# HASH PASSWORD (NEW USERS)
# -------------------------
def hash_password(password: str):
    return pwd_context.hash(password)


# -------------------------
# VERIFY PASSWORD (HYBRID)
# -------------------------
def verify_password(plain: str, hashed: str):
    try:
        # Try bcrypt first
        return pwd_context.verify(plain, hashed)
    except:
        # fallback → SHA256 / plain
        sha256_hash = hashlib.sha256(plain.encode()).hexdigest()
        return plain == hashed or sha256_hash == hashed