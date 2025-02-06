# This file defines the database table structures.
# It uses SQLAlchemy ORM to create the 'Resume' model.
# It maps the database tables to Python objects for easy manipulation.

from sqlalchemy import Column, Integer, String
from database import Base


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    skills = Column(String)
    experience = Column(String)
    education = Column(String)
    keywords = Column(String)