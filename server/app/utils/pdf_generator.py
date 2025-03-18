"""
Utility functions for generating sample PDF files for testing
"""

from fpdf import FPDF


class PDF(FPDF):
    """A custom PDF class for generating sample documents."""

    def header(self):
        """Add a header to each page."""
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, "Sample Job Description", 0, 1, "C")

    def footer(self):
        """Add a footer with page number to each page."""
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", 0, 0, "C")

    def chapter_title(self, title):
        """Add a chapter title."""
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, title, 0, 1, "L")
        self.ln(10)

    def chapter_body(self, body):
        """Add the main content of a chapter."""
        self.set_font("Arial", "", 12)
        self.multi_cell(0, 10, body)
        self.ln()


def create_sample_pdf(file_path: str) -> None:
    """
    Create a sample PDF file with a job description.

    Args:
        file_path: Path where the PDF file should be saved
    """
    pdf = PDF()
    pdf.add_page()
    pdf.chapter_title("Job Description")
    pdf.chapter_body(
        """
    We are looking for a skilled software developer to join our team. The ideal
    candidate should have experience with Python, SQL, and web development
    frameworks such as Django or Flask.

    Key responsibilities include:
    - Developing and maintaining web applications
    - Writing clean and efficient code
    - Collaborating with cross-functional teams
    - Troubleshooting and debugging issues

    Qualifications:
    - Bachelor's degree in Computer Science or related field
    - Strong knowledge of Python and SQL
    - Experience with web development frameworks
    - Excellent problem-solving skills
    - Good communication and teamwork skills
    """
    )
    pdf.output(file_path)


if __name__ == "__main__":
    create_sample_pdf("../sampleResume/sample_job_description.pdf")
