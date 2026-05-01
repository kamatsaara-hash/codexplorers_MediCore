from fastapi import APIRouter
from app.services.admin_service import (
    get_admin_overview,
    get_all_doctors,
    get_patients_grouped_by_doctor,
    get_pharmacy_data,
    get_doctor_workload
)

router = APIRouter()


@router.get("/overview")
async def overview():
    return await get_admin_overview()


@router.get("/doctors")
async def doctors():
    return await get_all_doctors()


@router.get("/patients")
async def patients():
    return await get_patients_grouped_by_doctor()


@router.get("/pharmacy")
async def pharmacy():
    return await get_pharmacy_data()


@router.get("/workload")
async def workload():
    return await get_doctor_workload()