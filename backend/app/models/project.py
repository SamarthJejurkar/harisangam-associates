from pydantic import BaseModel, Field
from typing import Optional

class ClientReview(BaseModel):
    quote: str
    client_name: str

class ProjectBase(BaseModel):
    title: str
    category: str          # Residential | Commercial | Interior | Landscape
    location: str
    year: str
    area: str               # e.g. "3,200 sq ft"
    typology: str            # e.g. "Single-family residence"
    concept: str
    architect_name: Optional[str] = None  # credited architect for this project              # long-form description text
    cover_image: str
    gallery: list[str] = []
    review: Optional[ClientReview] = None
    order: int = 0
    featured: bool = False
    featured_order: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: str