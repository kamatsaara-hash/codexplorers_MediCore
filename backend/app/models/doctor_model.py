def doctor_helper(doc) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "email": doc["email"],
        "phone": doc["phone"],
        "specialization": doc["specialization"],
        "appointments": doc.get("appointments", 0)
    }