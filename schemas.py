# This file defines data validation schemas using Pydantic.
# These schemas ensure that API request and response data follow the correct format.
# FastAPI uses these schemas to automatically validate input data.

from pydantic import BaseModel

class ResumeSchema(BaseModel):
    skills: str
    experience: str
    education: str
    keywords: staticmethod

    class Config:
        orm_mode = True
