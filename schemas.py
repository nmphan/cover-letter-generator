# This file defines data validation schemas using Pydantic.
# These schemas ensure that API request and response data follow the correct format.
# FastAPI uses these schemas to automatically validate input data.

from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ResumeSchema(BaseModel):
    skills: str
    experience: str
    education: str
    keywords: List[str]

    class Config:
        orm_mode = True

# POST
class ResumeCreate(BaseModel):
    candidate_name: Optional[str] = None
    contact_info: Optional[Dict[str, Any]] = None
    skills: Optional[List[str]] = None
    experience: Optional[List[Dict[str, Any]]] = None
    education: Optional[List[Dict[str, Any]]] = None
    certifications: Optional[List[str]] = None

# GET
class ResumeRead(BaseModel):
    id: int
    candidate_name: Optional[str] = None
    contact_info: Optional[Dict[str, Any]] = None
    skills: Optional[List[str]] = None
    experience: Optional[List[Dict[str, Any]]] = None
    education: Optional[List[Dict[str, Any]]] = None
    certifications: Optional[List[str]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# POST (JOb Description)
class JobDescriptionCreate(BaseModel):
    title: str
    company_name: Optional[str] = None
    location: Optional[str] = None
    requirements: Optional[List[str]] = None
    responsibilities: Optional[List[str]] = None

# GET (JOB Description)
class JobDescriptionRead(BaseModel):
    id: int
    title: str
    company_name: Optional[str] = None
    location: Optional[str] = None
    requirements: Optional[List[str]] = None
    responsibilities: Optional[List[str]] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

# POST (Cover letter)
class CoverLetterCreate(BaseModel):
    resume_id: int
    job_description_id: int
    letter_content: str
    score: Optional[float] = None

# GET (Cover letter)
class CoverLetterRead(BaseModel):
    id: int
    resume_id: int
    job_description_id: int
    letter_content: str
    score: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True