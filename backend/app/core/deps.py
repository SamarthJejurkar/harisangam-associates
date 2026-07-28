from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.security import decode_access_token

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    payload = decode_access_token(credentials.credentials)
    if payload is None or payload.get("username") is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return payload  # {"username": ..., "role": ...}

async def require_owner(user: dict = Depends(get_current_user)) -> dict:
    if user["role"] != "owner":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the owner can perform this action",
        )
    return user