from app.core.database import db
from app.core.config import settings
from app.core.hashing import hash_password

async def ensure_owner_exists():
    existing = await db.admins.find_one({"username": settings.owner_username})
    if existing:
        return

    await db.admins.insert_one({
        "username": settings.owner_username,
        "password_hash": hash_password(settings.owner_password),
        "role": "owner",
    })
    print(f"Owner account created: {settings.owner_username}")