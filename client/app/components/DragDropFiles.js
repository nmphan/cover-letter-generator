'use client';

import React, { useState } from 'react';

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  return (
    !files && (
      <div className="dropzone">
        <h1>Drag and Drop Files to Upload</h1>
        <h1>Or</h1>
        <button>Select Files</button>
      </div>
    )
  );
};

export default DragDropFiles;
