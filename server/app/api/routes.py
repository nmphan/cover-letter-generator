from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    File,
    UploadFile,
    Response,
)
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..schemas import ResumeCreate, ResumeRead
from ..models import Resume
from ..services.parse_resume import parse_file
from ..services.qualification import qualification_match
from ..services.preview_formatter import format_resume_preview

router = APIRouter()


@router.post("/api/parse-resume")
async def upload_file(file: UploadFile = File(...)):
    content = parse_file(file.file, file.filename)
    return Response(content=content, media_type="application/json")


@router.post("/api/parse-job-description")
async def upload_job_description(description: str):
    raise HTTPException(status_code=501, detail="Not Implemented")


@router.post("/api/qualification-match")
async def qualification(job_data, resume_data):
    content = qualification_match(job_data, resume_data)
    return Response(content=content, media_type="application/json")


@router.post("/api/save-resumes", response_model=ResumeRead)
def create_resume(resume_data: ResumeCreate, db: Session = Depends(get_db)):
    if not resume_data.candidate_name and resume_data.contact_info:
        resume_data.candidate_name = resume_data.contact_info.get("name")

    new_resume = Resume(
        candidate_name=resume_data.candidate_name,
        contact_info=resume_data.contact_info,
        skills=resume_data.skills,
        experience=resume_data.experience,
        education=resume_data.education,
        certifications=resume_data.certifications,
    )
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)
    return new_resume


@router.post("/api/preview-resume")
async def preview_resume(file: UploadFile = File(...)):
    """
    Parse a resume file and return formatted data for preview.
    """
    try:
        content_str = parse_file(file.file, file.filename)
        return format_resume_preview(content_str)
    except Exception as e:
        return {"error": str(e), "preview_available": False}
