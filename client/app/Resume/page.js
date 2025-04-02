"use client";

import React, { useState } from "react";
import ResumePreview from "../components/ResumePreview";
import Dropzone from "../UploadingDrawing/dropzone";

const ResumePage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);

    try {
      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) return console.error("Server error during parsing");

      const result = await res.json();
      setResumeData(result.resume_data);
      setMatchResult(result.matching);
      setShowPreview(true);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleReset = () => {
    setResumeData(null);
    setMatchResult(null);
    setShowPreview(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {!showPreview ? (
        <div className="space-y-6">
          <Dropzone onUpload={handleUpload} />
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here (optional)"
            rows={5}
            className="w-full border border-gray-300 rounded-md p-3"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <ResumePreview
            resumeData={resumeData}
            onProceed={() => console.log("Proceed clicked")}
            onEdit={handleReset}
          />

          {matchResult && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Job Match Summary</h3>
              <div className="text-sm space-y-1">
                <p>Matched: {matchResult.matched.length}</p>
                <p>Unmatched: {matchResult.unmatched.length}</p>
                <p>Match Score: {matchResult.match_score}%</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumePage;