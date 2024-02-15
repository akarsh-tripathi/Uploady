import React, { useState, useEffect } from 'react';

function FileSuccess() {
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  useEffect(() => {
    // Set uploadedSuccess to true
    setUploadedSuccess(true);

    // After 5 seconds, set uploadedSuccess to false
    const timer = setTimeout(() => {
      setUploadedSuccess(false);
    }, 5000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      {uploadedSuccess && (
        <div className="flex items-center space-x-2">
          <img src="C:\Users\akars\OneDrive\Desktop\Zomato\image_upload_app\src\imgsrc\animation.gif" alt="Success GIF" />
        </div>
      )}
    </div>
  );
}

export default FileSuccess;
