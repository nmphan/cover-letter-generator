# This is the main entry point of the FastAPI application.
# It defines the API endpoints and handles HTTP requests.
# It connects to the database, processes business logic, and returns responses.

from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Response
from starlette.middleware.cors import CORSMiddleware
from parse_resume import parse_file
from sqlalchemy.orm import Session
from schemas import ResumeCreate, ResumeRead
from database import get_db
import models
from preview_formatter import format_resume_preview
from datetime import datetime
from typing import Union

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database
# models.Base.metadata.create_all(bind=engine)
#
#
# #
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
#
#
# @app.get("/api/resumes/{resume_id}", response_model=ResumeSchema)
# def get_resume_data(resume_id: int, db: Session = Depends(get_db)):
#     resume = db.query(models.Resume).filter(models.Resume.id == resume_id).first()
#     if not resume:
#         raise HTTPException(status_code=404, detail="Resume not found")
#     return resume

@app.post("/api/parse-resume")
async def upload_file(file: UploadFile = File(...)):
    content = parse_file(file.file, file.filename)
    return Response(content=content, media_type="application/json")

@app.post("/api/parse-job-description")
async def upload_job_description(description: str):
    raise HTTPException(status_code=501, detail="Not Implemented")

@app.post("/api/save-resumes", response_model=ResumeRead)
def create_resume(
    resume_data: ResumeCreate,
    db: Session = Depends(get_db)
):
    
    if not resume_data.candidate_name and resume_data.contact_info:
        resume_data.candidate_name = resume_data.contact_info.get("name")

    new_resume = models.Resume(
        candidate_name = resume_data.candidate_name,
        contact_info   = resume_data.contact_info,
        skills         = resume_data.skills,
        experience     = resume_data.experience,
        education      = resume_data.education,
        certifications = resume_data.certifications
    )
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return new_resume

@app.post("/api/preview-resume")
async def preview_resume(file: UploadFile = File(...)):
    """
    Parse a resume file and return formatted data for preview.
    """
    try:
        # Parse the file using existing parse_file function
        content_str = parse_file(file.file, file.filename)
        
        # Format the parsed content for preview
        formatted_data = format_resume_preview(content_str)
        
        # Return the formatted JSON
        return formatted_data
    except Exception as e:
        return {"error": str(e), "preview_available": False}

