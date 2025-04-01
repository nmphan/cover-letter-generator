from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from server.app.services.parse_resume import parse_resume_file
from server.app.services.match_skills import match_job_requirements

router = APIRouter()

@router.post("/api/parse-resume")
async def parse_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(None)  # Optional job description input
):
    try:
        # Parse the resume file (PDF/DOC/DOCX)
        resume_data = parse_resume_file(resume)

        # Perform optional job matching
        match_result = match_job_requirements(resume_data, job_description)

        return JSONResponse(
            status_code=200,
            content={
                "resume_data": resume_data,
                "matching": match_result
            }
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
