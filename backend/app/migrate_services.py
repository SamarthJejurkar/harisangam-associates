"""
One-off migration: replaces the live 'services' section's items array with
the client's finalized 7-service list.
Run once (from backend/ folder): python -m app.migrate_services
"""
import asyncio
from app.core.database import db

NEW_ITEMS = [
    {"title": "Architecture", "description": "Full-scale architectural design from concept to completion, across residential and commercial projects."},
    {"title": "Interior Design", "description": "Considered interior spaces that balance function, material, and light."},
    {"title": "Landscape Design", "description": "Outdoor spaces designed to work in harmony with the built structure."},
    {"title": "Structural Design", "description": "Structural planning and engineering to bring every design safely to life."},
    {"title": "Liaisoning", "description": "Handling regulatory approvals and municipal coordination on your behalf."},
    {"title": "Planning and Visualisation", "description": "Master planning and 3D visualisation to see the project before it's built."},
    {"title": "Real Estate Consultancy", "description": "Strategic advice on land use, valuation, and development potential."},
]

async def migrate():
    doc = await db.sections.find_one({"_id": "services"})
    if not doc:
        print("No 'services' section found - nothing to migrate.")
        return
    await db.sections.update_one({"_id": "services"}, {"$set": {"items": NEW_ITEMS}})
    print(f"Updated services.items with {len(NEW_ITEMS)} services.")

if __name__ == "__main__":
    asyncio.run(migrate())