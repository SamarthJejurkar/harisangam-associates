"""
One-off migration: adds the 'site_settings' section to the live database
so the admin logo-upload feature has somewhere to store the logo URL.

Run once (from backend/ folder): python -m app.migrate_site_settings
Safe to re-run: skips if it already exists.
"""
import asyncio
from app.core.database import db


async def migrate():
    existing = await db.sections.find_one({"_id": "site_settings"})
    if existing:
        print("'site_settings' already exists. Skipping.")
        return

    await db.sections.insert_one({"_id": "site_settings", "logo_url": ""})
    print("Created 'site_settings' section.")


if __name__ == "__main__":
    asyncio.run(migrate())