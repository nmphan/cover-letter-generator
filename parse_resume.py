import pymupdf
from fastapi import HTTPException
from google import genai
from dotenv import load_dotenv
import docx2txt
from io import BytesIO
import os

load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')
client = genai.Client(api_key=api_key)


def parse_resume(resume_text):
    prompt = f"""
        Extract the following details from this resume in VALID JSON format. Return this format even if the fields are empty:
        - skills (list)
        - experience (list of objects with 'company', 'title', 'dates', 'description')
        - education (list of objects with 'institution', 'degree', 'dates')
        - certifications (list)
        - contact_info (object with 'name' 'email', 'phone', 'linkedin')
        Do NOT use "null" for empty fields.
        DO NOT include any formatting that might be present in the resume. (ex bullet points, etc.)
        Do NOT use markdown. Example format:
        {{
            "skills": ["Python", "ML"],
            "experience": [{{"company": "ABC Corp", "title": "Developer", ...}}],
            ...
        }}
    Resume Text:
    {resume_text}
    """
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt
        )
        json_data = response.text.replace('```json', '').replace('```', '').replace('\\n', ' ').strip()
    except Exception as e:
        raise HTTPException(status_code=503, detail="Service temporarily Unavailable", headers={"Retry-After": "10"}) from e
    return json_data

def extract_pdf(file):
    try:
        text = ""
        doc = pymupdf.open(stream=file.read(), filetype="pdf")
        for page in doc:
            text += page.get_text()
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid PDF") from e
    return parse_resume(text)


def extract_docx(file):
    try:
        # Read the file content as bytes
        file_content = file.read()

        # Use BytesIO to simulate a file object in memory
        text = docx2txt.process(BytesIO(file_content))

        if text:
            print("Text extracted successfully!")
        else:
            print("No text extracted.")

    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid DOCX file") from e

    return parse_resume(text)


def parse_file(file, filename):
    if filename.endswith(".pdf"):
        return extract_pdf(file)
    elif filename.endswith(".docx"):
        return extract_docx(file)
    else:
        raise HTTPException(status_code=415, detail="Unsupported File Type")
