from pydantic import BaseModel, EmailStr
from typing import Literal

class AdminBase(BaseModel):
    username: str
    email: EmailStr
    role: Literal["owner", "admin"] = "admin"

class AdminCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class AdminOut(AdminBase):
    id: str

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    username: str