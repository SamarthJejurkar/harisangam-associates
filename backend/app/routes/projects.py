from fastapi import APIRouter, HTTPException, Query, Depends
from bson import ObjectId
from bson.errors import InvalidId
from app.core.database import db
from app.core.deps import get_current_user
from app.models.project import ProjectCreate
from typing import Optional

router = APIRouter(prefix="/api/projects", tags=["projects"])

def serialize_project(project) -> dict:
    project["id"] = str(project.pop("_id"))
    return project

# --- Public routes ---

@router.get("")
async def list_projects(category: Optional[str] = Query(default=None)):
    query = {}
    if category and category.lower() != "all":
        query["category"] = category

    cursor = db.projects.find(query).sort("order", 1)
    projects = await cursor.to_list(length=None)
    return [serialize_project(p) for p in projects]

@router.get("/featured/list")
async def list_featured_projects():
    cursor = db.projects.find({"featured": True}).sort("featured_order", 1)
    projects = await cursor.to_list(length=None)
    return [serialize_project(p) for p in projects]

@router.get("/{project_id}")
async def get_project(project_id: str):
    try:
        obj_id = ObjectId(project_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid project id")

    project = await db.projects.find_one({"_id": obj_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return serialize_project(project)

# --- Protected (admin) routes ---

@router.post("")
async def create_project(payload: ProjectCreate, user: dict = Depends(get_current_user)):
    # New projects go to the end of the order
    last = await db.projects.find_one(sort=[("order", -1)])
    next_order = (last["order"] + 1) if last else 1

    doc = payload.model_dump()
    doc["order"] = next_order

    result = await db.projects.insert_one(doc)
    created = await db.projects.find_one({"_id": result.inserted_id})
    return serialize_project(created)

@router.put("/{project_id}")
async def update_project(project_id: str, payload: ProjectCreate, user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(project_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid project id")

    existing = await db.projects.find_one({"_id": obj_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = payload.model_dump()
    update_data["order"] = existing["order"]  # preserve order, not editable via this form
    update_data["featured"] = existing.get("featured", False)  # preserve, set via featured picker only
    update_data["featured_order"] = existing.get("featured_order", 0)
    await db.projects.update_one({"_id": obj_id}, {"$set": update_data})
    updated = await db.projects.find_one({"_id": obj_id})
    return serialize_project(updated)

@router.delete("/{project_id}")
async def delete_project(project_id: str, user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(project_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid project id")

    result = await db.projects.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"deleted": True}

class ReorderPayload(dict):
    pass

@router.put("/reorder/bulk")
async def reorder_projects(payload: dict, user: dict = Depends(get_current_user)):
    """
    Expects: { "order": [project_id_1, project_id_2, ...] } in the new desired order.
    """
    ids = payload.get("order", [])
    for index, project_id in enumerate(ids):
        try:
            obj_id = ObjectId(project_id)
        except InvalidId:
            continue
        await db.projects.update_one({"_id": obj_id}, {"$set": {"order": index + 1}})

    cursor = db.projects.find({}).sort("order", 1)
    projects = await cursor.to_list(length=None)
    return [serialize_project(p) for p in projects]

@router.put("/featured/bulk")
async def set_featured_projects(payload: dict, user: dict = Depends(get_current_user)):
    """
    Expects: { "ids": [project_id_1, project_id_2, ...] } - up to 6, in display order.
    """
    ids = payload.get("ids", [])
    if len(ids) > 6:
        raise HTTPException(status_code=400, detail="Maximum 6 featured projects allowed")

    await db.projects.update_many({}, {"$set": {"featured": False, "featured_order": 0}})

    for index, project_id in enumerate(ids):
        try:
            obj_id = ObjectId(project_id)
        except InvalidId:
            continue
        await db.projects.update_one(
            {"_id": obj_id},
            {"$set": {"featured": True, "featured_order": index + 1}},
        )

    cursor = db.projects.find({"featured": True}).sort("featured_order", 1)
    projects = await cursor.to_list(length=None)
    return [serialize_project(p) for p in projects]