import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
import spacy
import docx
import fitz  # PyMuPDF
from fastapi import HTTPException
from google import genai
from dotenv import load_dotenv
import os


# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')

# Load Spacy model
nlp = spacy.load("en_core_web_sm")

# Load GEMINI API client
load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')
client = genai.Client(api_key=api_key)

# Definition of function to parse job description using the same format of the resume parsing function
def parse_job_description(job_description_text):
    prompt = f"""
    Extract the following details from this job description in VALID LIST OF STRINGS. Return this format even if the fields are empty:
    - title (string - max of 100 characters)
    - company Name (string - max of 100 characters)
    - location (string - max of 100 characters)
    - requirement (list of skills and qualifications)
    - responsibilities (list of tasks)
    Do NOT use "null" for empty fields.
    DO NOT include any formatting that might be present in the job description. (ex bullet points, etc.)
    Do NOT use markdown. Example format:
    {{
        "title": "Software Developer"
        "company_name": "Tech Company"
        "location": "New York, NY"
        "requirements": {"Python", "Java", "SQL"}
        "responsibilities": {"Develop and maintain web applications"}
    }}
    Job Description Text:
    {job_description_text}
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

def read_docx(file_path):
    doc = docx.Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

def read_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# Read job description from DOCX or PDF file
file_path = 'sampleResume/{file_name}'
if file_path.endswith('.docx'):
    job_description = read_docx(file_path)
elif file_path.endswith('.pdf'):
    job_description = read_pdf(file_path)
else:
    raise ValueError("Unsupported file format")

# Tokenize the job description
tokens = word_tokenize(job_description)

# Remove stopwords
stop_words = set(stopwords.words('english'))
filtered_tokens = [word for word in tokens if word.lower() not in stop_words and word.isalpha()]

# Calculate frequency distribution
fdist = FreqDist(filtered_tokens)

# Print the most common words (key skills and qualifications)
print("Most common words:")
print(fdist.most_common(10))

# Use Spacy for Named Entity Recognition
doc = nlp(job_description)
print("\nExtracted Skills and Qualifications:")
for ent in doc.ents:
    if ent.label_ in ["SKILL", "QUALIFICATION"]:
        print(ent.text)