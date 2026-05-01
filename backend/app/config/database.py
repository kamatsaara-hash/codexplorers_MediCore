from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = AsyncIOMotorClient(MONGO_URL)
db = client["hospital_db"]

# Collections
patients_collection = db["patients"]
doctors_collection = db["doctors"]
appointments_collection = db["appointments"]
pharmacy_collection = db["pharmacy"]