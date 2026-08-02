"""
One-off migration: converts the live 'hero' section doc from a single
`image` string field to an `images` list field (for the 5-slide carousel).

Run this ONCE against the real database after deploying the new
HeroContent model, before anyone opens the admin panel's homepage editor.

Usage (from backend/ folder):
    python -m app.migrate_hero_images
"""
import asyncio
from app.core.database import db


async def migrate():
    hero = await db.sections.find_one({"_id": "hero"})
    if not hero:
        print("No 'hero' section found — nothing to migrate.")
        return

    if "images" in hero:
        print("Hero already migrated (images field present). Skipping.")
        return

    old_image = hero.get("image")
    if not old_image:
        print("No legacy 'image' field found either — nothing to migrate.")
        return

    await db.sections.update_one(
        {"_id": "hero"},
        {
            "$set": {"images": [old_image]},
            "$unset": {"image": ""},
        },
    )
    print(f"Migrated hero.image -> hero.images: [{old_image}]")


if __name__ == "__main__":
    asyncio.run(migrate())