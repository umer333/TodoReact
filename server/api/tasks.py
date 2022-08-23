from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Header
from models.models import User, Tasks
from sqlalchemy.orm import Session
from fastapi import  HTTPException
from config.database import get_db
from config.utils import response, decode_access_token
from fastapi.responses import  JSONResponse, Response
from typing import Optional, Union
from sqlalchemy import or_, and_
router = APIRouter()
import datetime
import calendar


def get_start_end_date(month, year):
    num_days = calendar.monthrange(year, month)[1]
    start_date = datetime.date(year, month, 1)
    end_date = datetime.date(year, month, num_days)
    return start_date, end_date


def validate_token(db, Authorization):
    if Authorization:
        decode = decode_access_token(str(Authorization).replace('Bearer ',''))
        if decode:
            print("yser",decode)
            user_obj = db.query(User).filter(User.username == decode).one_or_none()
            if user_obj:
                return user_obj
    return False


@router.post('/get_tasks/', status_code=200)
async def get_tasks(data : dict ,db: Session = Depends(get_db), Authorization : Union[str, None]= Header(default=None)):
    try:
        user_obj = validate_token(db, Authorization)
        if user_obj:
            print(user_obj)
            # start_date, end_date = get_start_end_date(data['month'], data['year'])
            tasks = db.query(Tasks).filter(and_(Tasks.start_time >= data['start_date'], Tasks.end_time <= data['end_date']), Tasks.user_id == user_obj.id).values(
                Tasks.id, Tasks.user_id,Tasks.title, Tasks.start_time, Tasks.end_time, Tasks.description
            )
            return response(status=200, message="Data Found", body=tasks)
        return response(status=403, message="Request Forbidden")
    except Exception as e:
        return response(status=400, message=str(e))



@router.post('/add_task/', status_code=200)
async def add_task(data : dict, db : Session = Depends(get_db), Authorization: Union[str, None]= Header(default=None)):
    try:

        user_obj = validate_token(db, Authorization)
        if user_obj:
            if data['title'] == None or data['start_time'] == None or data['end_time'] == None or data['description'] == None:
                return response(status=400, message="Fields are missing")
            new_task = Tasks(title=data['title'], start_time=data['start_time'], end_time=data['end_time'], description=data['description'], user_id=user_obj.id)
            db.add(new_task)
            db.commit()
            return response(status=201, message="Task Created Successfully")
        return response(status=403,message="Request Forbidden")
    except Exception as e:
        return response(status=400,message=str(e))

