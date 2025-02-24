import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
import spacy
import docx
import fitz  # PyMuPDF

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')

# Load Spacy model
nlp = spacy.load("en_core_web_sm")

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