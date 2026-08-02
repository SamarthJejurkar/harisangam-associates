from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from bson.errors import InvalidId
from app.core.database import db
from app.core.deps import get_current_user
from app.models.gallery import GalleryImageCreate

router = APIRouter(prefix="/api/gallery", tags=["gallery"])

def serialize_image(image) -> dict:
    image["id"] = str(image.pop("_id"))
    return image

@router.get("")
async def list_gallery_images():
    cursor = db.gallery_images.find({}).sort("order", 1)
    images = await cursor.to_list(length=None)
    return [serialize_image(i) for i in images]

@router.post("")
async def create_gallery_image(payload: GalleryImageCreate, user: dict = Depends(get_current_user)):
    """
    payload.order is the exact slot index (0-49) chosen in the admin grid.
    If that slot is already occupied (shouldn't normally happen from the UI,
    but guard anyway), bump to the next free slot instead of overwriting.
    """
    doc = payload.model_dump()

    occupied = await db.gallery_images.find_one({"order": doc["order"]})
    if occupied:
        last = await db.gallery_images.find_one(sort=[("order", -1)])
        doc["order"] = (last["order"] + 1) if last else 0

    result = await db.gallery_images.insert_one(doc)
    created = await db.gallery_images.find_one({"_id": result.inserted_id})
    return serialize_image(created)

@router.put("/{image_id}")
async def update_gallery_image(image_id: str, payload: GalleryImageCreate, user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(image_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid image id")
    existing = await db.gallery_images.find_one({"_id": obj_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Image not found")
    update_data = payload.model_dump()
    update_data["order"] = existing["order"]
    await db.gallery_images.update_one({"_id": obj_id}, {"$set": update_data})
    updated = await db.gallery_images.find_one({"_id": obj_id})
    return serialize_image(updated)

@router.delete("/{image_id}")
async def delete_gallery_image(image_id: str, user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(image_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid image id")
    result = await db.gallery_images.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"deleted": True}

@router.put("/reorder/bulk")
async def reorder_gallery_images(payload: dict, user: dict = Depends(get_current_user)):
    ids = payload.get("order", [])
    for index, image_id in enumerate(ids):
        try:
            obj_id = ObjectId(image_id)
        except InvalidId:
            continue
        await db.gallery_images.update_one({"_id": obj_id}, {"$set": {"order": index + 1}})
    cursor = db.gallery_images.find({}).sort("order", 1)
    images = await cursor.to_list(length=None)
    return [serialize_image(i) for i in images]