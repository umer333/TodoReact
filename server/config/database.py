import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
import urllib
from models import models
BASE_DIR = os.path.dirname(os.path.realpath('main.py'))

# from models.models import Base

DATABASE_URL = "postgresql://frt:123@localhost/tododata"

engine = create_engine(
    DATABASE_URL
)

if not database_exists(engine.url):
    create_database(engine.url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()