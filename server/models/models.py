import enum
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Enum
from sqlalchemy.sql.sqltypes import Boolean, Integer
from config.database import Base, engine
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy import Boolean, Column, ForeignKey, String
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(100), unique=True)
    date_created = Column(DateTime , default=datetime.utcnow)
    password = Column(String(100))
    username = Column(String(200))
    company = Column(String(200))
    designation = Column(String(200))

    tasks = relationship('Tasks', back_populates='users')



class Tasks(Base):

    __tablename__ = 'tasks'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String(200))
    start_time = Column(DateTime)
    end_time = Column(DateTime, nullable= True)
    description = Column(String(500), nullable = True)

    users = relationship('User', back_populates='tasks')




Base.metadata.create_all(bind=engine)