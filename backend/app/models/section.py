# from pydantic import BaseModel
# from typing import Optional

# class HeroContent(BaseModel):
#     headline_line1: str
#     headline_line2: str
#     headline_accent: str
#     subtext: str
#     cta_text: str
#     image: str

# class AboutContent(BaseModel):
#     eyebrow: str
#     headline: str
#     headline_accent: str
#     body: str
#     signature: str
#     image: str

# class ServiceItem(BaseModel):
#     title: str
#     description: str

# class ServicesContent(BaseModel):
#     eyebrow: str
#     headline: str
#     items: list[ServiceItem]

# class ContactContent(BaseModel):
#     eyebrow: str
#     headline: str
#     headline_accent: str
#     email: str
#     phone: str
#     address: str

# class QuoteContent(BaseModel):
#     quote: str
#     signature: str
#     image: str

from pydantic import BaseModel
from typing import Optional

class HeroContent(BaseModel):
    headline_line1: str
    headline_line2: str
    headline_accent: str
    subtext: str
    cta_text: str
    images: list[str]  # up to 5, carousel slides

class AboutContent(BaseModel):
    eyebrow: str
    headline: str
    headline_accent: str
    body: str
    signature: str
    image: str

class ServiceItem(BaseModel):
    title: str
    description: str

class ServicesContent(BaseModel):
    eyebrow: str
    headline: str
    items: list[ServiceItem]

class ContactContent(BaseModel):
    eyebrow: str
    headline: str
    headline_accent: str
    email: str
    phone: str
    address: str

class QuoteContent(BaseModel):
    quote: str
    signature: str
    image: str