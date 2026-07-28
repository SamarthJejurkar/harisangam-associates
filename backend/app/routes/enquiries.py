from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from bson.errors import InvalidId
from datetime import datetime, timezone
from app.core.database import db
from app.core.deps import get_current_user
from app.models.enquiry import EnquiryCreate

router = APIRouter(prefix="/api/enquiries", tags=["enquiries"])

def serialize_enquiry(e) -> dict:
    e["id"] = str(e.pop("_id"))
    return e

# --- Public route: anyone can submit ---

@router.post("")
async def create_enquiry(payload: EnquiryCreate):
    doc = payload.model_dump()
    doc["read"] = False
    doc["created_at"] = datetime.now(timezone.utc)

    result = await db.enquiries.insert_one(doc)
    created = await db.enquiries.find_one({"_id": result.inserted_id})
    return serialize_enquiry(created)

# --- Protected: admin inbox ---

@router.get("")
async def list_enquiries(user: dict = Depends(get_current_user)):
    cursor = db.enquiries.find({}).sort("created_at", -1)
    enquiries = await cursor.to_list(length=None)
    return [serialize_enquiry(e) for e in enquiries]

@router.put("/{enquiry_id}/read")
async def mark_read_status(enquiry_id: str, read: bool, user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(enquiry_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid enquiry id")

    result = await db.enquiries.update_one({"_id": obj_id}, {"$set": {"read": read}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")

    updated = await db.enquiries.find_one({"_id": obj_id})
    return serialize_enquiry(updated)

@router.delete("/{enquiry_id}")
async def delete_enquiry(enquiry_id: str, user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(enquiry_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid enquiry id")

    result = await db.enquiries.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")

    return {"deleted": True}