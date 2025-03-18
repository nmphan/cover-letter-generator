# This file defines the database table structures.
# It uses SQLAlchemy ORM to create the 'Resume' model.
# It maps the database tables to Python objects for easy manipulation.

from datetime import datetime
from typing import Optional
from typing_extensions import Annotated

from sqlalchemy import (
    String,
    Text,
    ForeignKey,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.sql import func

str100 = Annotated[str, 100]


class Base(DeclarativeBase):
    type_annotation_map = {
        str100: String(100),
    }


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now()
    )


intpk = Annotated[int, mapped_column(primary_key=True, index=True)]
resume_fk = Annotated[
    int, mapped_column(ForeignKey("resumes.id", ondelete="CASCADE"))
]
job_description_fk = Annotated[
    int, mapped_column(ForeignKey("job_descriptions.id", ondelete="CASCADE"))
]
text = Annotated[str, mapped_column(Text)]


class Resume(Base, TimestampMixin):
    __tablename__ = "resumes"

    id: Mapped[intpk]
    candidate_name: Mapped[str100]
    contact_info: Mapped[Optional[JSONB]]  # JSONB in PostgreSQL
    skills: Mapped[Optional[JSONB]]
    experience: Mapped[Optional[JSONB]]
    education: Mapped[Optional[JSONB]]
    certifications: Mapped[Optional[JSONB]]


class JobDescription(Base, TimestampMixin):
    __tablename__ = "job_descriptions"

    id: Mapped[intpk]
    title: Mapped[Optional[str100]]
    company_name: Mapped[Optional[str100]]
    location: Mapped[Optional[str100]]
    requirements: Mapped[Optional[JSONB]]
    responsibilities: Mapped[Optional[JSONB]]


class CoverLetter(Base, TimestampMixin):
    __tablename__ = "cover_letters"

    id: Mapped[intpk]
    resume_id: Mapped[resume_fk]
    job_description_id: Mapped[job_description_fk]
    letter_content: Mapped[text]
    score: Mapped[Optional[float]]
