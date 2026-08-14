"""
One-off migration: restructures the live 'about_family' section doc.
OLD shape: { eyebrow, heading, members: [4 people, founder included] }
NEW shape: { eyebrow, heading, founder: {...}, members: [4 OTHER people] }
Run once (from backend/ folder): python -m app.migrate_about_family
Safe to re-run: skips if already migrated.
"""
import asyncio
from app.core.database import db

EMPTY_MEMBER = {
    "name": "New Family Member",
    "role": "Architect",
    "bio": "Add a short bio here.",
    "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800",
}

async def migrate():
    doc = await db.sections.find_one({"_id": "about_family"})
    if not doc:
        print("No 'about_family' section found - nothing to migrate.")
        return
    if "founder" in doc:
        print("about_family already migrated (founder field present). Skipping.")
        return

    old_members = doc.get("members", [])
    founder = old_members[0] if len(old_members) > 0 else dict(EMPTY_MEMBER)
    remaining = old_members[1:] if len(old_members) > 1 else []
    while len(remaining) < 4:
        remaining.append(dict(EMPTY_MEMBER))
    remaining = remaining[:4]

    await db.sections.update_one(
        {"_id": "about_family"},
        {"$set": {"founder": founder, "members": remaining}},
    )
    print(f"Migrated about_family: founder = '{founder.get('name')}', {len(remaining)} other members.")

if __name__ == "__main__":
    asyncio.run(migrate())