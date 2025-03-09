from sqlalchemy.orm import Session
from models import JobDescription
from schemas import JobDescriptionCreate
import extract_skill


def store_job_description(db: Session, job_description_text: str):
    """
    Parses a job description and stores it in the database.
    Updates existing job descriptions instead of duplicating.
    """
    parsed_data = extract_skill.parse_job_description(job_description_text)
    
    # Check for existing job description
    existing_job = db.query(JobDescription).filter(
        JobDescription.title == parsed_data.get("title"),
        JobDescription.company_name == parsed_data.get("company_name"),
        JobDescription.location == parsed_data.get("location")
    ).first()
    
    if existing_job:
        existing_job.requirements = parsed_data.get("requirements")
        existing_job.responsibilities = parsed_data.get("responsibilities")
        db.commit()
        db.refresh(existing_job)
        return existing_job  # Return updated entry
    
    job_desc = JobDescription(
        title=parsed_data.get("title"),
        company_name=parsed_data.get("company_name"),
        location=parsed_data.get("location"),
        requirements=parsed_data.get("requirements"),
        responsibilities=parsed_data.get("responsibilities"),
    )
    db.add(job_desc)
    db.commit()
    db.refresh(job_desc)
    return job_desc