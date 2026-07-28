from pydantic import BaseModel, EmailStr

class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    message: str