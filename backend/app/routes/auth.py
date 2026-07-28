from fastapi import APIRouter, HTTPException, status, Depends
from app.core.database import db
from app.core.security import create_access_token
from app.core.hashing import hash_password, verify_password
from app.core.deps import get_current_user, require_owner
from app.models.admin import LoginRequest, LoginResponse, AdminCreate

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest):
    user = await db.admins.find_one({"username": payload.username})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")

    token = create_access_token(username=user["username"], role=user["role"])
    return LoginResponse(access_token=token, role=user["role"], username=user["username"])

@router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    return user

# --- Admin management (owner only) ---

@router.get("/admins")
async def list_admins(owner: dict = Depends(require_owner)):
    admins = await db.admins.find({}, {"password_hash": 0}).to_list(length=None)
    for a in admins:
        a["id"] = str(a.pop("_id"))
    return admins

@router.post("/admins")
async def create_admin(payload: AdminCreate, owner: dict = Depends(require_owner)):
    existing = await db.admins.find_one({"username": payload.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    result = await db.admins.insert_one({
        "username": payload.username,
        "password_hash": hash_password(payload.password),
        "role": "admin",
    })
    return {"id": str(result.inserted_id), "username": payload.username, "role": "admin"}

@router.delete("/admins/{admin_id}")
async def delete_admin(admin_id: str, owner: dict = Depends(require_owner)):
    from bson import ObjectId
    target = await db.admins.find_one({"_id": ObjectId(admin_id)})
    if not target:
        raise HTTPException(status_code=404, detail="Admin not found")
    if target["role"] == "owner":
        raise HTTPException(status_code=400, detail="Cannot delete the owner account")

    await db.admins.delete_one({"_id": ObjectId(admin_id)})
    return {"deleted": True}