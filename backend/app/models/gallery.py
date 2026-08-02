from pydantic import BaseModel
from typing import Optional

class GalleryImageBase(BaseModel):
    image_url: str
    caption: Optional[str] = None
    order: int = 0
    size: str = ""

class GalleryImageCreate(GalleryImageBase):
    pass

class GalleryImageOut(GalleryImageBase):
    id: str