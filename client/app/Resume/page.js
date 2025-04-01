"use client";
import React, { useState } from "react";
import ResumePreview from "../components/ResumePreview";

export default function ResumePage() {
  // Simulating extracted resume data (replace with real API data later)
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    skills: ["React", "Next.js", "Python", "FastAPI"],
    education: [
      "Diploma in Computer Engineering - SAIT (2023)",
      "B.Tech in IT - India (2020)"
    ],
    experience: [
      "Frontend Developer at XYZ Ltd (2022 - 2023)",
      "Intern at ABC Software (2020 - 2021)"
    ]
  });

  const handleProceed = () => {
    // You can redirect to the cover letter page or call a backend API
    alert("Proceeding to generate your cover letter...");
    // Example: router.push("/generate-cover-letter");
  };

  const handleEdit = () => {
    // You can redirect to a form where the user can edit extracted info
    alert("Redirecting to the edit page...");
    // Example: router.push("/edit-resume-data");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <ResumePreview
        resumeData={resumeData}
        onProceed={handleProceed}
        onEdit={handleEdit}
      />
    </div>
  );
}
