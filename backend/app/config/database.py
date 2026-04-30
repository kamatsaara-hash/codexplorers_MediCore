from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)
db = client["hospital_db"]

patient_collection = db["patients"]
doctor_collection = db["doctors"]
appointment_collection = db["appointments"]
pharmacy_collection = db["pharmacy"]