"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ResumePreview = ({ resumeData, onProceed, onEdit }) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Preview Extracted Resume Data</h2>
      <Card className="mb-4">
        <CardContent className="space-y-3">
          <div>
            <h3 className="font-semibold">Name:</h3>
            <p>{resumeData.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email:</h3>
            <p>{resumeData.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone:</h3>
            <p>{resumeData.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Skills:</h3>
            <p>{resumeData.skills?.join(", ")}</p>
          </div>
          <div>
            <h3 className="font-semibold">Education:</h3>
            {resumeData.education?.map((edu, index) => (
              <p key={index}>{edu}</p>
            ))}
          </div>
          <div>
            <h3 className="font-semibold">Experience:</h3>
            {resumeData.experience?.map((exp, index) => (
              <p key={index}>{exp}</p>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button onClick={onProceed}>Proceed
        </Button>
      </div>
    </div>
  );
};

export default ResumePreview;
