import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.PROD_URL
    : `https://api.clg.srv.major.tools`,
});

// Cover Letter Endpoints
export const generateCoverLetterPDF = (data) => 
  API.post('/api/generate-cover-letter/pdf', data, { responseType: 'blob' });

export const generateCoverLetterDOCX = (data) => 
  API.post('/api/generate-cover-letter/docx', data, { responseType: 'blob' });

// Resume Endpoints
export const parseResume = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/api/parse-resume', formData);
};

export const saveResume = (resumeData) => 
  API.post('/api/save-resumes', resumeData);

// Job Description Endpoints
export const parseJobDescription = (description) => 
  API.post('/api/parse-job-description', { description });

export const checkQualifications = (jobData, resumeData) => 
  API.post('/api/qualification-match', { job_data: jobData, resume_data: resumeData });
