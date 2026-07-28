import asyncio
from app.core.database import db

projects_seed = [
    {
        "title": "Hillside Villa",
        "category": "Residential",
        "location": "Lonavala",
        "year": "2023",
        "area": "4,200 sq ft",
        "typology": "Single-family residence",
        "concept": "Set into a sloped hillside, this home negotiates the terrain rather than flattening it. Split-level volumes step down the slope, each opening onto its own terrace, so every room keeps a private relationship with the valley beyond.",
        "cover_image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
        "gallery": [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
        ],
        "review": {"quote": "They understood the site before they ever drew a line.", "client_name": "R. Deshmukh"},
        "order": 1,
    },
    {
        "title": "The Lake House",
        "category": "Residential",
        "location": "Mulshi",
        "year": "2024",
        "area": "5,800 sq ft",
        "typology": "Weekend residence",
        "concept": "A low, horizontal composition that mirrors the still water it faces. Deep overhangs shade a continuous glass edge, blurring the line between interior and lake.",
        "cover_image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
        "gallery": [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
        ],
        "review": {"quote": "Every window frames the lake like it was planned around it.", "client_name": "A. Kulkarni"},
        "order": 2,
    },
    {
        "title": "The Offices",
        "category": "Commercial",
        "location": "Pune",
        "year": "2023",
        "area": "18,000 sq ft",
        "typology": "Corporate workspace",
        "concept": "A workplace organized around a central light well, bringing daylight deep into the floor plate. Material palette kept deliberately raw — exposed concrete, timber, blackened steel — to age gracefully under daily use.",
        "cover_image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
        "gallery": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
            "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1200",
        ],
        "review": {"quote": "Our team's daily experience of the space completely changed.", "client_name": "S. Rao, Director"},
        "order": 3,
    },
    {
        "title": "Wabi House",
        "category": "Residential",
        "location": "Alibaug",
        "year": "2022",
        "area": "3,600 sq ft",
        "typology": "Single-family residence",
        "concept": "Rooted in the wabi-sabi principle of embracing imperfection, this home uses unfinished lime plaster, reclaimed timber, and handmade tile — surfaces that carry the mark of the hand that made them.",
        "cover_image": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1200",
        "gallery": ["https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1200"],
        "review": {"quote": "A house that feels lived-in from the very first day.", "client_name": "N. Joshi"},
        "order": 4,
    },
    {
        "title": "The Courtyard",
        "category": "Interior",
        "location": "Pune",
        "year": "2023",
        "area": "2,100 sq ft",
        "typology": "Interior renovation",
        "concept": "A gutted apartment reorganized around a light-filled internal courtyard, replacing corridors with a shared central space that every room borrows light and air from.",
        "cover_image": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200",
        "gallery": ["https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200"],
        "review": {"quote": "It feels twice the size it actually is.", "client_name": "P. Sharma"},
        "order": 5,
    },
    {
        "title": "The Pavilion",
        "category": "Landscape",
        "location": "Goa",
        "year": "2024",
        "area": "800 sq ft",
        "typology": "Garden pavilion",
        "concept": "An open-sided pavilion set within an existing garden, structured entirely in timber and thatch to sit lightly on the land, used for events, yoga, and quiet mornings.",
        "cover_image": "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200",
        "gallery": ["https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200"],
        "review": {"quote": "Guests never want to leave that pavilion.", "client_name": "V. Menon"},
        "order": 6,
    },
]

async def seed():
    await db.projects.delete_many({})
    result = await db.projects.insert_many(projects_seed)
    print(f"Seeded {len(result.inserted_ids)} projects.")

if __name__ == "__main__":
    asyncio.run(seed())