# This file defines the database table structures.
# It uses SQLAlchemy ORM to create the 'Resume' model.
# It maps the database tables to Python objects for easy manipulation.

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    candidate_name = Column(String(100), nullable=False)
    contact_info = Column(JSONB)     # JSONB in PostgreSQL
    skills = Column(JSONB)
    experience = Column(JSONB)
    education = Column(JSONB)
    certifications = Column(JSONB)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    company_name = Column(String(100))
    location = Column(String(100))
    requirements = Column(JSONB)
    responsibilities = Column(JSONB)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class CoverLetter(Base):
    __tablename__ = "cover_letters"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id", ondelete="CASCADE"))
    job_description_id = Column(Integer, ForeignKey("job_descriptions.id", ondelete="CASCADE"))
    letter_content = Column(Text)
    score = Column(Float)  
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
