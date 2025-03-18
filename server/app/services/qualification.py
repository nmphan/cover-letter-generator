import google.generativeai as genai
from dotenv import load_dotenv
from fastapi import HTTPException
import os


def qualification_match(job_data, resume_data):
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)
    prompt = f"""
    ROLE: You are an expert hiring assistant. Analyze the job requirements and candidate data and determine if the
    candidate qualifies for the role.
    JOB DATA:
    {job_data}

    CANDIDATE DATA:
    {resume_data}

    RULES:
    1. Mandatory Check: Verify if the candidate meets ALL mandatory requirements. Highlight any gaps. Reject if any major requirements are not met(example a senior developer applying for a student intern role)
    2. Use only JSON format - no extra texts are needed.
    2. Round percentage score to nearest integer, no decimals.
    3. Final Assessment: Classify as [Excellent Fit/Good Fit/Marginal Fit].
    4. Preferred Scoring:  Calculate a match score (0-100%) for preferred qualifications using the provided weights:
         Years of Experience (25%) – (Candidate's years / Required years) * 25%
         Education Level (20%) – Full points for a matching or higher degree, partial for related but lower.
         Technical Skills (30%) – Divide weight among key skills; missing a skill results in a deduction.
         Certifications & Training (10%) – Full for required certs, partial for related ones.
         Soft Skills & Cultural Fit (10%) – Based on preferred qualities.
         Additional Relevant Experience (5%) – Bonus for extra qualifications.

         Round the final score to the nearest integer.
            - For example:
            - If the job prefers 5 years of experience and the candidate has 4, score = (4/5) * 25% weight = 20%.  
            - If a preferred skill (e.g., SQL) is missing, deduct points. 

    ONLY RETURN THE FIELDS IN THE SAMPLE FORMAT
    Sample Output Format:
    {{
        "summary": "Candidate meets all mandatory requirements with strong technical skills",
        "score": 82,
        "verdict": "Excellent Fit",
        "mandatory_check": {{
            "status": "passed",
            "missing_requirements": []
        }},
        "details": [
            {{
            "category": "Education",
            "status": "met",
            "explanation": "Bachelor's in Computer Science matches requirements"
            }},
            {{
            "category": "Skills",
            "status": "partially_met",
            "explanation": "Python: Advanced (exceeds requirement), Missing SQL"
            }},
            {{
                "category": "experience",
                "status": "met",
                "explanation": "7 years of experience"
            }}
        ]
    }}
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        json_data = (
            response.text.replace("```json", "")
            .replace("```", "")
            .replace("\\n", " ")
            .strip()
        )
        # json_data = response.text
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail="Service temporarily Unavailable",
            headers={"Retry-After": "10"},
        ) from e
    return json_data
