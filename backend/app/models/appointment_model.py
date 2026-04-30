def appointment_helper(app) -> dict:
    return {
        "id": str(app["_id"]),
        "patient_id": app["patient_id"],
        "doctor_id": app["doctor_id"],
        "date": app["date"],
        "status": app.get("status", "scheduled")
    }