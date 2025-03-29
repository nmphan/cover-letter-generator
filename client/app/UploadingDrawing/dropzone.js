// "use client"

// import React, { useRef } from "react";
// import { useDropzone } from "react-dropzone";
// import { FaDownload } from "react-icons/fa"; // Make sure you import the FaDownload icon

// export default function Dropzone(props) {
//   // Form props and refs
//   const { required, name } = props;

//   const hiddenInputRef = useRef(null);

//   // Call the library
//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
//     onDrop: (incomingFiles) => {
//       if (hiddenInputRef.current) {
//         // Note the specific way we need to munge the file into the hidden input
//         // https://stackoverflow.com/a/68182158/1068446
//         const dataTransfer = new DataTransfer();
//         incomingFiles.forEach((v) => {
//           dataTransfer.items.add(v);
//         });
//         hiddenInputRef.current.files = dataTransfer.files;
//       }
//     },
//     // Restrict to PDF files
//     accept: {
//       "application/pdf": [],
//     },
//     // Limit number of files
//     maxFiles: 1,
//   });

//   // Show accepted files
//   const acceptedFileItems = acceptedFiles.map((file) => (
//     <li key={file.path}>{file.path}</li>
//   ));

//   return (
//     <section className="container text-black m-10 p-10 rounded-xl border-4 border-dashed text-center align-middle">
//       {/* Updated drag and drop box */}
//       <div {...getRootProps({ className: "w-[511px] h-14 left-14 top-[459px] absolute bg-white cursor-pointer border-black overflow-hidden" })}>
//         <div className="left-20 top-5 absolute text-black">
//           <FaDownload />
//         </div>
//         {/* Hidden file input */}
//         <input
//           type="file"
//           name={name}
//           required={required}
//           ref={hiddenInputRef}
//           {...getInputProps()} // Spread the dropzone input props here
//         />
//         {acceptedFiles.length === 0 ? (
//           <p className="absolute top-4 left-1/2 transform -translate-x-1/2">Drag and drop or Upload Files here</p>
//         ) : (
//           <ul className="absolute top-4 left-1/2 transform -translate-x-1/2">{acceptedFileItems}</ul>
//         )}
//       </div>
//     </section>
//   );
// }


// import React from 'react';

// export default function Dropzone({ onFileUpload }) {
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       onFileUpload(file);
//     }
//   };

//   return (
//     <div className="dropzone">
//       <input 
//         type="file" 
//         onChange={handleFileChange}
//         accept=".pdf,.doc,.docx"
//       />
//       <p>Drag & drop your resume file here, or click to select</p>
//     </div>
//   );
// }


// client/src/UploadingDrawing/dropzone.js
// "use client";
// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
// import { FaDownload } from "react-icons/fa";

// export default function Dropzone({ onTextExtracted, disabled }) {
//   const onDrop = useCallback(async (acceptedFiles) => {
//     if (acceptedFiles.length === 0) return;

//     const file = acceptedFiles[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // Send file to backend for parsing
//       const response = await axios.post(
//         'http://localhost:8000/api/parse-resume',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           validateStatus: (status) => status < 500
//         }
//       );

//       if (response.data?.text) {
//         // Pass the extracted text to the parent component
//         onTextExtracted(response.data.text);
//       } else {
//         throw new Error('No text extracted from resume');
//       }
//     } catch (error) {
//       console.error('Error parsing resume:', {
//         message: error.message,
//         response: error.response?.data
//       });
//       alert(`Failed to parse resume: ${error.message}`);
//     }
//   }, [onTextExtracted]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//       'application/msword': ['.doc'],
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
//     },
//     maxFiles: 1,
//     disabled
//   });

//   return (
//     <div 
//       {...getRootProps()} 
//       className={`w-full h-[100px] border-2 border-dashed border-black rounded-lg flex items-center justify-center cursor-pointer
//         ${isDragActive ? 'bg-gray-200' : 'bg-white'}
//         ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//     >
//       <input {...getInputProps()} />
//       <div className="flex items-center space-x-2">
//         <FaDownload className="text-black" />
//         <p className="text-black text-lg">
//           {isDragActive
//             ? "Drop your resume here"
//             : "Drag & drop your resume or click to select (PDF, DOC, DOCX)"}
//         </p>
//       </div>
//     </div>
//   );
// }

// client/src/UploadingDrawing/dropzone.js
"use client";
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FaDownload } from "react-icons/fa";

export default function Dropzone({ onTextExtracted, disabled }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `https://api.clg.srv.major.tools/api/parse-resume`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          validateStatus: (status) => status < 500
        }
      );

      if (response.data?.skills) {
        // Pass the full parsed object to the parent
        onTextExtracted(response.data);
      } else {
        throw new Error('No skills found in parsed resume');
      }
    } catch (error) {
      console.error('Error parsing resume:', {
        message: error.message,
        response: error.response?.data
      });
      alert(`Failed to parse resume: ${error.message}`);
    }
  }, [onTextExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled
  });

//   return (
//     <div 
//       {...getRootProps()} 
//       className={`w-full h-[100px] border-2 border-dashed border-black rounded-lg flex items-center justify-center cursor-pointer
//         ${isDragActive ? 'bg-gray-200' : 'bg-white'}
//         ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//     >
//       <input {...getInputProps()} />
//       <div className="flex items-center space-x-2">
//         <FaDownload className="text-black" />
//         <p className="text-black text-lg">
//           {isDragActive
//             ? "Drop your resume here"
//             : "Drag & drop your resume or click to select (PDF, DOC, DOCX)"}
//         </p>
//       </div>
//     </div>
//   );
// }

return (
  <div
    {...getRootProps()}
    className={`w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300
      ${isDragActive 
        ? 'border-indigo-500 bg-indigo-50' 
        : 'border-gray-300 bg-white'}
      ${disabled 
        ? 'opacity-60 cursor-not-allowed bg-gray-100' 
        : 'hover:border-indigo-400 hover:bg-gray-50'}
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
    tabIndex={disabled ? -1 : 0}
  >
    <input {...getInputProps()} />
    <div className="flex flex-col items-center space-y-2">
      <FaDownload 
        className={`text-xl transition-colors duration-300 ${
          isDragActive ? 'text-indigo-600' : 'text-gray-600'
        } ${disabled ? 'text-gray-400' : ''}`}
      />
      <p className={`text-base font-medium text-center transition-colors duration-300 ${
        isDragActive ? 'text-indigo-700' : 'text-gray-700'
      } ${disabled ? 'text-gray-500' : ''}`}>
        {isDragActive ? (
          "Drop your resume here"
        ) : (
          <>
            <span className="hidden sm:inline">Drag & drop your resume or </span>
            <span>click to select </span>
            <span className="text-xs text-gray-500">(PDF, DOC, DOCX)</span>
          </>
        )}
      </p>
    </div>
  </div>
);
}