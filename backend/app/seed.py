import asyncio
from app.core.database import db

sections_seed = {
    "hero": {
        "headline_line1": "SPACES",
        "headline_line2": "THAT INSPIRE",
        "headline_accent": "LIFE",
        "subtext": "Architecture that responds to context, crafted for human experience.",
        "cta_text": "EXPLORE OUR WORK",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    },
    "about": {
        "eyebrow": "ABOUT US",
        "headline": "Good design is invisible.",
        "headline_accent": "It's felt, not seen.",
        "body": "Harsangam & Associates is an architecture practice grounded in context, material honesty, and human experience. Every project begins with a question: how should this place feel?",
        "signature": "— HARSANGAM & ASSOCIATES",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
    },
    "services": {
        "eyebrow": "SERVICES",
        "headline": "What we do",
        "items": [
            {"title": "Residential", "description": "Homes designed around light, material, and daily ritual."},
            {"title": "Commercial", "description": "Workspaces and retail environments built for people first."},
            {"title": "Interior", "description": "Interiors that extend architectural intent inward."},
            {"title": "Landscape", "description": "Outdoor spaces that root buildings to their site."},
        ],
    },
    "contact": {
        "eyebrow": "CONTACT",
        "headline": "Let's build something",
        "headline_accent": "together.",
        "email": "studio@harsangam.com",
        "phone": "+91 98765 43210",
        "address": "Pune, Maharashtra, India",
    },
    "quote": {
        "quote": "Good design is invisible. It's felt, not seen.",
        "signature": "— HARSANGAM & ASSOCIATES",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
    },
}

async def seed():
    for section_name, content in sections_seed.items():
        await db.sections.update_one(
            {"_id": section_name},
            {"$set": {"_id": section_name, **content}},
            upsert=True,
        )
        print(f"Seeded: {section_name}")

    print("Done seeding sections.")

if __name__ == "__main__":
    asyncio.run(seed())