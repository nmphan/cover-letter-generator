// import React from 'react'
// import Header from '../components/Header'
// import { FaDownload } from "react-icons/fa";
// import Dropzone from '../UploadingDrawing/dropzone';

// export default function Main() {
//   return (
//     <div>
//       <Header />
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="w-[1369px] h-[790px] relative rounded-[10px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.25)] border bg-white">
//           <div className="w-[617px] h-[540px] left-10 top-[146px] absolute bg-[#d3d3d3]/50 rounded-lg overflow-hidden">
//             <div className="w-[617px] pl-7 pr-[485px] py-6 absolute border-b border-black justify-start items-center inline-flex overflow-hidden">
//               <div className="text-black/80 text-2xl font-bold font-['Inter'] tracking-wide">Resume</div>
//             </div>
//             <textarea
//               className="top-20 absolute w-[100%] h-[500px] p-6 text-black/80 text-2xl font-normal font-['Inter'] rounded-md bg-[#d3d3d3]/50 focus:outline-none border border-transparent transition-all duration-300"
//               placeholder="Paste resume text..."
//             />
//             <Dropzone />
//           </div>
//           <div className="w-[617px] h-[540px] left-[720px] top-[146px] absolute bg-[#d3d3d3]/50 rounded-lg overflow-hidden">
//             <div className="w-[617px] pl-9 pr-[375px] py-6 left-0 top-0 absolute border-b border-black justify-start items-center inline-flex overflow-hidden">
//               <div className="text-black text-2xl font-bold font-['Inter'] tracking-wide">Job description</div>
//             </div>
//             <textarea
//               className="top-20 absolute w-[100%] h-[500px] p-6 text-black/80 text-2xl font-normal font-['Inter'] rounded-md bg-[#d3d3d3]/50 focus:outline-none border border-transparent transition-all duration-300"
//               placeholder="Paste job description text..."
//             />
//           </div>
//           <div className="left-10 top-10 absolute">
//             <span className="text-black text-5xl font-extrabold font-['Inter'] tracking-wider">Cover </span>
//             <span className="text-black text-5xl font-bold font-['Inter'] tracking-wider">Craft</span>
//           </div>
//           <div className="w-auto h-16 pl-8 pr-9 py-3.5 left-[1102px] bottom-5 absolute bg-black rounded-xl border border-black justify-end items-center inline-flex overflow-hidden">
//             <div className="text-white/80 text-2xl font-black font-['Inter'] tracking-wide hover:text-white cursor-pointer">Generate</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Dropzone from '../UploadingDrawing/dropzone';
import axios from 'axios';

export default function Main() {
  const [resumeData, setResumeData] = useState(null); // Store full resume object
  const [resumeText, setResumeText] = useState(''); // Keep for textarea display
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleResumeParsed = (parsedData) => {
    setResumeData(parsedData);
    // Convert to string for textarea display
    const text = [
      `Skills: ${parsedData.skills.join(', ')}`,
      ...parsedData.experience.map(exp => 
        `${exp.title} at ${exp.company} (${exp.dates}): ${exp.description}`
      ),
      ...parsedData.education.map(edu => 
        `${edu.degree} from ${edu.institution} (${edu.dates})`
      ),
      `Contact: ${parsedData.contact_info.name}, ${parsedData.contact_info.email}`
    ].join('\n\n');
    setResumeText(text);
  };

  const handleGenerate = async () => {
    if (!resumeData || !jobDescription.trim()) {
      alert('Please upload a resume and provide a job description');
      return;
    }

    setIsGenerating(true);
    try {
      // 1. Parse Job Description
      const parseJobResponse = await axios.post(
        `https://api.clg.srv.major.tools/api/parse-job-description`,
        { description: jobDescription },
        {
          headers: { 'Content-Type': 'application/json' },
          validateStatus: (status) => status < 500
        }
      );

      if (!parseJobResponse.data) {
        throw new Error('Failed to parse job description');
      }

      // 2. Generate PDF
      const pdfResponse = await axios.post(
        `https://api.clg.srv.major.tools/api/generate-cover-letter/pdf`,
        {
          resume_data: resumeData,  // Use the full parsed resume object
          job_data: parseJobResponse.data,
          sender_info: {
            name: resumeData.contact_info.name || "Your Name",
            email: resumeData.contact_info.email || "your.email@example.com",
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        },
        {
          responseType: 'blob',
          headers: { 'Content-Type': 'application/json' },
          validateStatus: (status) => status < 500
        }
      );

      if (!pdfResponse.data || pdfResponse.data.size === 0) {
        throw new Error('Empty PDF response received');
      }

      // Download PDF
      const pdfBlob = new Blob([pdfResponse.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `cover_letter_${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error('Error generating cover letter:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      let errorMessage = 'Failed to generate cover letter';
      if (error.response?.status === 400) {
        errorMessage = 'Invalid input data provided';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error occurred';
      } else if (error.message) {
        errorMessage = error.message;
      }
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };



  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-purple-50">
  //     <Header />
  //     <div className="flex justify-center items-center py-16 px-6">
  //       <div className="w-full max-w-7xl relative bg-white rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl p-2">
  //         {/* Centered Title/Logo */}
  //         <div className="flex justify-center pt-10 z-10">
  //           <div>
  //             <span className="text-5xl md:text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-md">Cover</span>
  //             <span className="text-5xl md:text-5xl font-bold text-indigo-600 tracking-tight drop-shadow-md">Craft</span>
  //           </div>
  //         </div>
  
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 pt-20">
  //           {/* Resume Section */}
  //           <div className="bg-gradient-to-br from-gray-50 to-indigo-50/50 rounded-2xl border border-indigo-100/50 shadow-md transition-all duration-300 hover:border-indigo-300 hover:shadow-lg">
  //             <div className="flex justify-center py-4 bg-gradient-to-r from-indigo-200 to-indigo-400/50 rounded-t-2xl border-b border-indigo-200/50">
  //               <h2 className="text-2xl font-bold text-gray-800 tracking-wide">Resume</h2>
  //             </div>
  //             <div className="p-6 space-y-6">
  //               <Dropzone 
  //                 onTextExtracted={handleResumeParsed}
  //                 disabled={isGenerating}
  //               />
  //               <textarea
  //                 className="w-full h-96 p-4 text-base text-gray-700 bg-white/80 rounded-lg border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-none scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-indigo-50"
  //                 placeholder="Resume text will appear here after upload..."
  //                 value={resumeText}
  //                 onChange={(e) => {
  //                   setResumeText(e.target.value);
  //                 }}
  //               />
  //             </div>
  //           </div>
  
  //           {/* Job Description Section */}
  //           <div className="bg-gradient-to-br from-gray-50 to-indigo-50/50 rounded-2xl border border-indigo-100/50 shadow-md transition-all duration-300 hover:border-indigo-300 hover:shadow-lg">
  //             <div className="flex justify-center py-4 bg-gradient-to-r from-purple-200 to-purple-400/50 rounded-t-2xl border-b border-purple-200/50">
  //               <h2 className="text-2xl font-bold text-gray-800 tracking-wide">Job Description</h2>
  //             </div>
  //             <div className="p-6">
  //               <textarea
  //                 className="w-full h-[33rem] p-4 text-base text-gray-700 bg-white/80 rounded-lg border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-none scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-indigo-50"
  //                 placeholder="Paste job description text..."
  //                 value={jobDescription}
  //                 onChange={(e) => setJobDescription(e.target.value)}
  //               />
  //             </div>
  //           </div>
  //         </div>
  
  //         {/* Generate Button - Centered */}
  //         <div className="flex justify-center pb-10">
  //           <button
  //             className={`px-16 py-4 ${
  //               isGenerating 
  //                 ? 'bg-gray-400 cursor-not-allowed' 
  //                 : 'bg-indigo-600 hover:bg-indigo-800'
  //             } rounded-full text-white text-xl font-semibold tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300/50`}
  //             onClick={handleGenerate}
  //             disabled={isGenerating}
  //           >
  //             {isGenerating ? (
  //               <span className="flex items-center">
  //                 <svg className="animate-spin -ml-2 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  //                 </svg>
  //                 Generating...
  //               </span>
  //             ) : (
  //               'Generate'
  //             )}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-purple-50">
      <Header />
      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl relative bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
          {/* Gradient accent border */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 -z-10 blur-md opacity-20"></div>
          
          {/* Floating logo/title with subtle animation */}
          <div className="flex justify-center pt-12 z-10 relative">
            <div className="animate-float">
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                Cover<span className="text-gray-900">Craft</span>
              </h1>
              <p className="text-center text-lg text-gray-500 mt-2 font-medium">
                AI-Powered Cover Letter Generator
              </p>
            </div>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 pt-16">
            {/* Resume Section */}
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              {/* Floating gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              {/* Enhanced Header */}
              <div className="flex justify-center py-5 bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-indigo-200 rounded-t-2xl relative">
                {/* <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div> */}
                <h2 className="text-xl font-bold text-indigo-700 tracking-wide px-6 py-1 bg-white rounded-full border border-indigo-200 shadow-sm">
                  Your Resume
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                <Dropzone 
                  onTextExtracted={handleResumeParsed}
                  disabled={isGenerating}
                />
                <div className="relative">
                  <textarea
                    className="w-full h-96 p-4 text-base text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-none scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-indigo-50 shadow-inner"
                    //laceholder="Resume text will appear here after upload..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                  {!resumeText && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center p-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-2">Your resume will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            {/* Job Description Section */}
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              {/* Floating gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              {/* Enhanced Header */}
              <div className="flex justify-center py-5 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200 rounded-t-2xl relative">
                {/* <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div> */}
                <h2 className="text-xl font-bold text-purple-700 tracking-wide px-6 py-1 bg-white rounded-full border border-purple-200 shadow-sm">
                  Job Description
                </h2>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  <textarea
                    className="w-full h-[33rem] p-4 text-base text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-purple-50 shadow-inner"
                    //placeholder="Paste job description text..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  {!jobDescription && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center p-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2">Paste the job description here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
  
          {/* Generate Button */}
          <div className="flex justify-center pb-12 px-8">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`relative px-16 py-4 ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              } rounded-full text-white text-lg font-semibold tracking-wide transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-300/50 shadow-lg hover:shadow-xl`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Crafting Your Letter...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Cover Letter
                  </>
                )}
              </span>
              {/* Button glow effect */}
              {!isGenerating && (
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}