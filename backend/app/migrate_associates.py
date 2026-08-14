"""
One-off migration: adds the new 'associates' section to the live database
(seed.py alone won't touch an already-running site).

Run once (from backend/ folder): python -m app.migrate_associates
Safe to re-run: skips if 'associates' section already exists.
"""
import asyncio
from app.core.database import db

DEFAULT_ASSOCIATES = {
    "eyebrow": "OUR ASSOCIATES",
    "heading": "A network built to deliver every stage of a project.",
    "categories": [
        {"label": "Design", "associates": [{"name": "Mohit Harisangam Architects", "logo": ""}]},
        {"label": "Landscape", "associates": [{"name": "Mansi Harisangam Architects", "logo": ""}]},
        {"label": "Real Estate", "associates": [
            {"name": "Nirmiti Spaces", "logo": ""},
            {"name": "Nirmiti Construction", "logo": ""},
            {"name": "Nircon Developers", "logo": ""},
        ]},
        {"label": "Events", "associates": [{"name": "Nirmiti Lawns", "logo": ""}]},
    ],
}


async def migrate():
    existing = await db.sections.find_one({"_id": "associates"})
    if existing:
        print("'associates' section already exists. Skipping.")
        return

    await db.sections.insert_one({"_id": "associates", **DEFAULT_ASSOCIATES})
    print("Created 'associates' section with 4 categories.")


if __name__ == "__main__":
    asyncio.run(migrate())