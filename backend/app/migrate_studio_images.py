"""
One-off migration: converts the live 'about_studio' section's single
`image` field into an `images` array (for the new 3-slide carousel).
Run once (from backend/ folder): python -m app.migrate_studio_images
"""
import asyncio
from app.core.database import db

async def migrate():
    doc = await db.sections.find_one({"_id": "about_studio"})
    if not doc:
        print("No 'about_studio' section found - nothing to migrate.")
        return
    if "images" in doc:
        print("about_studio already migrated (images field present). Skipping.")
        return
    old_image = doc.get("image")
    if not old_image:
        print("No legacy 'image' field found either - nothing to migrate.")
        return
    await db.sections.update_one(
        {"_id": "about_studio"},
        {"$set": {"images": [old_image]}, "$unset": {"image": ""}},
    )
    print(f"Migrated about_studio.image -> about_studio.images: [{old_image}]")

if __name__ == "__main__":
    asyncio.run(migrate())