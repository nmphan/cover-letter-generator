"use client"

import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { FaDownload } from "react-icons/fa"; // Make sure you import the FaDownload icon

export default function Dropzone(props) {
  // Form props and refs
  const { required, name } = props;

  const hiddenInputRef = useRef(null);

  // Call the library
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (incomingFiles) => {
      if (hiddenInputRef.current) {
        // Note the specific way we need to munge the file into the hidden input
        // https://stackoverflow.com/a/68182158/1068446
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    },
    // Restrict to PDF files
    accept: {
      "application/pdf": [],
    },
    // Limit number of files
    maxFiles: 1,
  });

  // Show accepted files
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <section className="container text-black m-10 p-10 rounded-xl border-4 border-dashed text-center align-middle">
      {/* Updated drag and drop box */}
      <div {...getRootProps({ className: "w-[511px] h-14 left-14 top-[459px] absolute bg-white cursor-pointer border-black overflow-hidden" })}>
        <div className="left-20 top-5 absolute text-black">
          <FaDownload />
        </div>
        {/* Hidden file input */}
        <input
          type="file"
          name={name}
          required={required}
          ref={hiddenInputRef}
          {...getInputProps()} // Spread the dropzone input props here
        />
        {acceptedFiles.length === 0 ? (
          <p className="absolute top-4 left-1/2 transform -translate-x-1/2">Drag and drop or Upload Files here</p>
        ) : (
          <ul className="absolute top-4 left-1/2 transform -translate-x-1/2">{acceptedFileItems}</ul>
        )}
      </div>
    </section>
  );
}
