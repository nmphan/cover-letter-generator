# This file is responsible for handling parsing resume from docx and pdf files
import pymupdf
import os
import glob

sample_directory = 'sampleResume'
output_directory = "outputResume"
os.makedirs(sample_directory, exist_ok=True)
os.makedirs(output_directory, exist_ok=True)


def gather_pdf_files():
    pdf_files = glob.glob(f"{sample_directory}/*.pdf")
    for file in pdf_files:
        base_name = os.path.splitext(os.path.basename(file))[0]
        # Construct an output file path based on name of the file
        output_file = os.path.join(output_directory, f"{base_name}.txt")
        extract_pdf(file, output_file)


def extract_pdf(file_directory, output):
    """
        Extracts text from a PDF file and writes it to a corresponding .txt file.
    """
    try:
        doc = pymupdf.open(f'{file_directory}')
        with open(output, "wb") as output:
            text = ""
            for page in doc:
                page_text = page.get_text()
                output.write(page_text.encode("utf8"))  # get plain text encoded as UTF-8
                text += page_text
        print("Parsing complete for file: ", file_directory)
        return text
    except Exception as e:
        print(f"Error processing file {file_directory}: {e}")
        return None


gather_pdf_files()