def patient_helper(patient) -> dict:
    return {
        "id": str(patient["_id"]),
        "name": patient["name"],
        "email": patient["email"],
        "phone": patient["phone"],
        "age": patient["age"],
        "gender": patient["gender"]
    }