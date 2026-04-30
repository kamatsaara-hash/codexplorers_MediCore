def pharmacy_helper(med) -> dict:
    return {
        "id": str(med["_id"]),
        "medicine_name": med["medicine_name"],
        "quantity": med["quantity"]
    }