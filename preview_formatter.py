import json
from datetime import datetime
from typing import Dict, Any, Optional

def format_resume_preview(json_data: str) -> Dict[str, Any]:
    """
    Format the parsed resume data for preview display.
    This function takes the raw JSON string from the resume parser
    and formats it into a structured dictionary optimized for frontend preview.
    
    Args:
        json_data (str): JSON string from the resume parser
        
    Returns:
        Dict[str, Any]: Formatted data structure for preview
    """
    try:
        # Parse the JSON string to a Python dictionary
        resume_data = json.loads(json_data)
        
        # Create a formatted response structure
        preview_data = {
            "personal_info": {
                "name": resume_data.get("contact_info", {}).get("name", ""),
                "contact_details": {
                    "email": resume_data.get("contact_info", {}).get("email", ""),
                    "phone": resume_data.get("contact_info", {}).get("phone", ""),
                    "linkedin": resume_data.get("contact_info", {}).get("linkedin", "")
                }
            },
            "skills_section": {
                "skills": resume_data.get("skills", []),
                "total_skills": len(resume_data.get("skills", []))
            },
            "experience_section": {
                "positions": resume_data.get("experience", []),
                "total_positions": len(resume_data.get("experience", []))
            },
            "education_section": {
                "education": resume_data.get("education", []),
                "total_education": len(resume_data.get("education", []))
            },
            "certifications_section": {
                "certifications": resume_data.get("certifications", []),
                "total_certifications": len(resume_data.get("certifications", []))
            },
            "preview_metadata": {
                "generated_at": datetime.now().isoformat(),
                "preview_version": "1.0"
            }
        }
        
        return preview_data
    except json.JSONDecodeError:
        # Handle invalid JSON
        return {
            "error": "Invalid JSON format from parser",
            "preview_available": False
        }
    except Exception as e:
        # Handle other exceptions
        return {
            "error": f"Error formatting preview: {str(e)}",
            "preview_available": False
        }

def get_field_counts(resume_data: Dict[str, Any]) -> Dict[str, int]:
    """
    Helper function to count fields in the resume data.
    
    Args:
        resume_data (Dict[str, Any]): Parsed resume data
        
    Returns:
        Dict[str, int]: Counts of various fields
    """
    return {
        "skills": len(resume_data.get("skills", [])),
        "experience": len(resume_data.get("experience", [])),
        "education": len(resume_data.get("education", [])),
        "certifications": len(resume_data.get("certifications", []))
    }