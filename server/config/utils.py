from passlib.context import CryptContext
from jose import jwt
from typing import Optional, Union
from sqlalchemy import or_, and_
from pydantic import BaseModel
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


SECRET_KEY = "e43b11b98841f16393bea49fae1654f46b50a39eb78sd9f26a99eded41855ef4f"
ALGORITHM = "HS256"
PRIVATE_KEY= "LxVe9aKPKRf72bXvzzGt"

class GResponse(BaseModel):
    status: int
    message: str
    body:Optional[Union[list, dict, str]]
    stack: Optional[Union[list, dict, str]]


def response(status, message, body=None, stack={}):
    return GResponse(**{"status": status, "message": message, "body": body, 'stack': stack})


def get_password_hash(password):
    return pwd_context.hash(password)

async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        return username
    except:
        return False