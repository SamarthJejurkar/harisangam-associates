# import asyncio
# from app.core.database import db

# sections_seed = {
#     "hero": {
#         "headline_line1": "SPACES",
#         "headline_line2": "THAT INSPIRE",
#         "headline_accent": "LIFE",
#         "subtext": "Architecture that responds to context, crafted for human experience.",
#         "cta_text": "EXPLORE OUR WORK",
#         "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
#     },
#     "about": {
#         "eyebrow": "ABOUT US",
#         "headline": "Good design is invisible.",
#         "headline_accent": "It's felt, not seen.",
#         "body": "Harsangam & Associates is an architecture practice grounded in context, material honesty, and human experience. Every project begins with a question: how should this place feel?",
#         "signature": "— HARSANGAM & ASSOCIATES",
#         "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
#     },
#     "services": {
#         "eyebrow": "SERVICES",
#         "headline": "What we do",
#         "items": [
#             {"title": "Residential", "description": "Homes designed around light, material, and daily ritual."},
#             {"title": "Commercial", "description": "Workspaces and retail environments built for people first."},
#             {"title": "Interior", "description": "Interiors that extend architectural intent inward."},
#             {"title": "Landscape", "description": "Outdoor spaces that root buildings to their site."},
#         ],
#     },
#     "contact": {
#         "eyebrow": "CONTACT",
#         "headline": "Let's build something",
#         "headline_accent": "together.",
#         "email": "studio@harsangam.com",
#         "phone": "+91 98765 43210",
#         "address": "Pune, Maharashtra, India",
#     },
#     "quote": {
#         "quote": "Good design is invisible. It's felt, not seen.",
#         "signature": "— HARSANGAM & ASSOCIATES",
#         "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
#     },
# }

# async def seed():
#     for section_name, content in sections_seed.items():
#         await db.sections.update_one(
#             {"_id": section_name},
#             {"$set": {"_id": section_name, **content}},
#             upsert=True,
#         )
#         print(f"Seeded: {section_name}")

#     print("Done seeding sections.")

# if __name__ == "__main__":
#     asyncio.run(seed())

import asyncio
from app.core.database import db

sections_seed = {
    "hero": {
        "headline_line1": "SPACES",
        "headline_line2": "THAT INSPIRE",
        "headline_accent": "LIFE",
        "subtext": "Architecture that responds to context, crafted for human experience.",
        "cta_text": "EXPLORE OUR WORK",
        "images": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
        ],
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
            {
                "title": "Residential",
                "description": "Homes designed around light, material, and daily ritual.",
            },
            {
                "title": "Commercial",
                "description": "Workspaces and retail environments built for people first.",
            },
            {
                "title": "Interior",
                "description": "Interiors that extend architectural intent inward.",
            },
            {
                "title": "Landscape",
                "description": "Outdoor spaces that root buildings to their site.",
            },
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
    "about_firm": {
        "eyebrow": "ABOUT",
        "heading": "Across every scale, one vision.",
        "heading_accent": "Design for Life.",
        "body": "Harisangam & Associates is a name built on three generations of architectural practice. From single-family homes to full commercial developments, every project carries the same conviction: that good design should serve the people who live in it.",
        "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    },
    "about_family": {
        "eyebrow": "THE FAMILY",
        "heading": "Three generations, one practice.",
        "members": [
            {
                "name": "Founder Name",
                "role": "Founder & Principal Architect",
                "bio": "Founded the practice with a belief that architecture should be shaped by the people and place it serves.",
                "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800",
            },
            {
                "name": "Sibling One",
                "role": "Principal Architect",
                "bio": "Leads residential and interior projects, with a focus on material honesty and craft.",
                "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800",
            },
            {
                "name": "Sibling Two",
                "role": "Principal Architect",
                "bio": "Oversees commercial and landscape work, bringing a systems-first approach to large-scale design.",
                "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800",
            },
            {
                "name": "Sibling Three",
                "role": "Principal Architect",
                "bio": "Manages client relationships and project delivery, ensuring every build matches its original intent.",
                "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
            },
        ],
    },
    "about_studio": {
        "eyebrow": "THE STUDIO",
        "heading": "Founded on craft, built to last.",
        "body": "Our studio operates as a single team across residential, commercial, and landscape work—from first sketch to final handover.",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600",
        "stats": [
            {
                "value": "2005",
                "label": "FOUNDED",
            },
            {
                "value": "120+",
                "label": "PROJECTS COMPLETED",
            },
            {
                "value": "12",
                "label": "TEAM MEMBERS",
            },
            {
                "value": "3",
                "label": "CITIES",
            },
        ],
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