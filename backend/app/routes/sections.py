# from fastapi import APIRouter, HTTPException
# from app.core.database import db

# router = APIRouter(prefix="/api/sections", tags=["sections"])

# @router.get("/{section_name}")
# async def get_section(section_name: str):
#     section = await db.sections.find_one({"_id": section_name})
#     if not section:
#         raise HTTPException(status_code=404, detail=f"Section '{section_name}' not found")
#     section["id"] = section.pop("_id")
#     return section

# @router.put("/{section_name}")
# async def update_section(section_name: str, content: dict):
#     result = await db.sections.update_one(
#         {"_id": section_name},
#         {"$set": content},
#         upsert=True,
#     )
#     updated = await db.sections.find_one({"_id": section_name})
#     updated["id"] = updated.pop("_id")
#     return updated

from fastapi import APIRouter, HTTPException, Depends
from app.core.database import db
from app.core.deps import get_current_user

router = APIRouter(prefix="/api/sections", tags=["sections"])

@router.get("/{section_name}")
async def get_section(section_name: str):
    section = await db.sections.find_one({"_id": section_name})
    if not section:
        raise HTTPException(status_code=404, detail=f"Section '{section_name}' not found")
    section["id"] = section.pop("_id")
    return section

@router.put("/{section_name}")
async def update_section(section_name: str, content: dict, user: dict = Depends(get_current_user)):
    result = await db.sections.update_one(
        {"_id": section_name},
        {"$set": content},
        upsert=True,
    )
    updated = await db.sections.find_one({"_id": section_name})
    updated["id"] = updated.pop("_id")
    return updated