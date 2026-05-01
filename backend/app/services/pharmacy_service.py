from app.config.database import pharmacy_collection


async def get_medicines():
    medicines = []

    async for med in pharmacy_collection.find():
        medicine = {
            "id": str(med["_id"]),
            "medicine_name": med.get("medicine_name"),
            "quantity": med.get("quantity")
        }

        medicines.append(medicine)

    return medicines