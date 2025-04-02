def match_job_requirements(resume_data, job_description=None):
    """
    Matches user's resume data with job description text if provided.
    Returns match result only if job_description is given.
    """

    if not job_description:
        return {
            "matched": [],
            "unmatched": [],
            "match_score": 0
        }

    matched = []
    unmatched = []
    resume_text = ""

    # Combine resume data into one string
    for key in ["skills", "education", "experience"]:
        items = resume_data.get(key)
        if items:
            resume_text += " " + " ".join(items)

    resume_text = resume_text.lower()
    requirements = [line.strip().lower() for line in job_description.split("\n") if line.strip()]

    for req in requirements:
        if any(word in resume_text for word in req.split()):
            matched.append(req)
        else:
            unmatched.append(req)

    score = round((len(matched) / len(requirements)) * 100, 2) if requirements else 0

    return {
        "matched": matched,
        "unmatched": unmatched,
        "match_score": score
    }