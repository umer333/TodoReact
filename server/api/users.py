from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from models.models import User
from sqlalchemy.orm import Session
from fastapi import  HTTPException
from config.database import get_db
from config.utils import get_password_hash, verify_password, create_access_token
from fastapi.responses import  JSONResponse, Response
from sqlalchemy import or_

router = APIRouter()



@router.post('/signin/', status_code=200)
async def sign_in(user : dict ,db: Session = Depends(get_db)):
    try:
        find_user = db.query(User).filter(User.username == user['username']).one_or_none()
        if find_user:
            if not await verify_password(user['password'], find_user.password):
                return Response(status_code=403, content='Username or password is incorrect')
            else:
                token = create_access_token(data={"sub": find_user.username})
                return JSONResponse( {"access_token": token}, status_code=200)
        else:
            return Response(status_code=404, content="Username or password is incorrect.")
    except HTTPException:
        raise
    except Exception as e:
        print("this is erro",e)
        raise HTTPException(status_code=500, detail='Internal Server Error')


@router.post('/signup/', status_code=201)
async def create_user(user: dict, db: Session = Depends(get_db)):
    try:
        if user['password'] == '' or user['email'] == '' or user['username']=='':
            return Response(status_code=404,content="Email,Username and Password are required fields")
        find_user = db.query(User).filter(or_(User.email == user['email'] , User.username == user['username'])).one_or_none()
        if find_user:
            return Response(status_code=400, content="User already exists")
        password = get_password_hash(user['password'])
        new_user = User(email=user['email'], password=password, designation=user['designation'], company=user['company'], username=user['username'])
        db.add(new_user)
        db.commit()
        return Response(status_code=201, content="User Created Successfully")

    except HTTPException:
        raise
    except Exception as e:
        print(e)
        return Response(status_code=500, content="Internal Server Error")