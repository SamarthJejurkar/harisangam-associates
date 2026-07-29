from app.core.database import db
from app.core.config import settings
from app.core.hashing import hash_password

async def ensure_owner_exists():
    existing = await db.admins.find_one({"username": settings.owner_username})
    if existing:
        # If the owner doc already exists but predates the email field, backfill it.
        if "email" not in existing:
            await db.admins.update_one(
                {"_id": existing["_id"]},
                {"$set": {"email": settings.owner_email}},
            )
            print(f"Backfilled email for existing owner: {settings.owner_username}")
        return

    await db.admins.insert_one({
        "username": settings.owner_username,
        "email": settings.owner_email,
        "password_hash": hash_password(settings.owner_password),
        "role": "owner",
    })
    print(f"Owner account created: {settings.owner_username}")