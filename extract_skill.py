import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')

# Sample job description
job_description = """
We are looking for a skilled software engineer with experience in Python, Java, and cloud technologies.
The ideal candidate should have strong problem-solving skills and a background in computer science.
"""

# Tokenize the job description
tokens = word_tokenize(job_description)

# Remove stopwords
stop_words = set(stopwords.words('english'))
filtered_tokens = [word for word in tokens if word.lower() not in stop_words and word.isalpha()]

# Calculate frequency distribution
fdist = FreqDist(filtered_tokens)

# Print the most common words (key skills and qualifications)
print(fdist.most_common(10))