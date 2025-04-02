from fastapi import (
    APIRouter,
    HTTPException,
    Depends,
    File,
    UploadFile,
    Response,
    Body,
    Form,
)
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from ..core.database import get_db
from schemas import ResumeCreate, ResumeRead
from models import Resume
from ..services.parse_resume import parse_file
from ..services.qualification import qualification_match
from ..services.preview_formatter import format_resume_preview
from ..utils.pdf_generator import generate_cover_letter_pdf, generate_cover_letter_docx
from ..services.job_service import generate_cover_letter  # 👈 Imported new function
import os
import tempfile

router = APIRouter()

# ✅ 1. Parse Resume
@router.post("/api/parse-resume")
async def upload_file(file: UploadFile = File(...)):
    content = parse_file(file.file, file.filename)
    return Response(content=content, media_type="application/json")

#  2. Job Description Placeholder
@router.post("/api/parse-job-description")
async def upload_job_description(description: str):
    raise HTTPException(status_code=501, detail="Not Implemented")

#  3. Qualification Match
@router.post("/api/qualification-match")
async def qualification(job_data, resume_data):
    content = qualification_match(job_data, resume_data)
    return Response(content=content, media_type="application/json")

# 4. Save Resume to Database
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

#  5. Resume Preview
@router.post("/api/preview-resume")
async def preview_resume(file: UploadFile = File(...)):
    try:
        content_str = parse_file(file.file, file.filename)
        return format_resume_preview(content_str)
    except Exception as e:
        return {"error": str(e), "preview_available": False}

#  6. Generate Cover Letter from Resume + JD (TEXT only)
@router.post("/api/generate-cover-letter")
async def generate_cover_letter_text(
    resume: UploadFile = File(...),
    job_description: UploadFile = File(...)
):
    try:
        resume_text = (await resume.read()).decode("utf-8")
        job_desc_text = (await job_description.read()).decode("utf-8")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File decoding error: {str(e)}")

    cover_letter = generate_cover_letter(resume_text, job_desc_text)

    if cover_letter.startswith("❌"):
        raise HTTPException(status_code=500, detail=cover_letter)

    return {"cover_letter": cover_letter}

#  7. Generate Cover Letter as PDF
@router.post("/api/generate-cover-letter/pdf")
async def generate_cover_letter_as_pdf(cover_letter_data: dict = Body(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_path = temp_file.name

        generate_cover_letter_pdf(cover_letter_data, temp_path)

        with open(temp_path, "rb") as f:
            pdf_content = f.read()

        os.unlink(temp_path)

        return Response(
            content=pdf_content,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=cover_letter.pdf"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 8. Generate Cover Letter as DOCX
@router.post("/api/generate-cover-letter/docx")
async def generate_cover_letter_as_docx(cover_letter_data: dict = Body(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as temp_file:
            temp_path = temp_file.name

        generate_cover_letter_docx(cover_letter_data, temp_path)

        with open(temp_path, "rb") as f:
            docx_content = f.read()

        os.unlink(temp_path)

        return Response(
            content=docx_content,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": "attachment; filename=cover_letter.docx"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
