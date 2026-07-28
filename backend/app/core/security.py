from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from app.core.config import settings

ACCESS_TOKEN_EXPIRE_HOURS = 12

def create_access_token(username: str, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {"sub": username, "role": role, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)

def decode_access_token(token: str) -> dict | None:
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return {"username": payload.get("sub"), "role": payload.get("role")}
    except JWTError:
        return None