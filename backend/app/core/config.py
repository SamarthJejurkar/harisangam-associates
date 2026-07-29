from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongo_uri: str
    db_name: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    cloudinary_cloud_name: str
    cloudinary_api_key: str
    cloudinary_api_secret: str
    owner_username: str
    owner_password: str
    owner_email: str
    frontend_url: str = "http://localhost:5173"
    smtp_host: str
    smtp_port: int = 587
    smtp_username: str
    smtp_password: str
    smtp_from_email: str

    class Config:
        env_file = ".env"

settings = Settings()


