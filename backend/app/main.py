# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.core.database import db
# from app.core.startup import ensure_owner_exists
# from app.routes import sections, projects, auth ,enquiries, gallery
# from app.core.config import settings

# app = FastAPI(title="Harsangam & Associates API")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[settings.frontend_url, "http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.on_event("startup")
# async def on_startup():
#     await ensure_owner_exists()

# app.include_router(sections.router)
# app.include_router(projects.router)
# app.include_router(auth.router)
# app.include_router(enquiries.router)
# app.include_router(gallery.router)

# @app.get("/")
# async def root():
#     return {"message": "Harsangam API is running"}

# @app.get("/api/health/db")
# async def db_health():
#     collections = await db.list_collection_names()
#     return {"status": "connected", "collections": collections}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import db
from app.core.startup import ensure_owner_exists
from app.routes import sections, projects, auth, enquiries, gallery
from app.core.config import settings


app = FastAPI(title="Harsangam & Associates API")


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://www.harisangamassociates.com",
        "https://harisangamassociates.com",
        "http://localhost:5173",
        settings.frontend_url,
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await ensure_owner_exists()


# Routes
app.include_router(sections.router)
app.include_router(projects.router)
app.include_router(auth.router)
app.include_router(enquiries.router)
app.include_router(gallery.router)


@app.get("/")
async def root():
    return {"message": "Harsangam API is running"}


@app.get("/api/health/db")
async def db_health():
    collections = await db.list_collection_names()
    return {
        "status": "connected",
        "collections": collections,
    }