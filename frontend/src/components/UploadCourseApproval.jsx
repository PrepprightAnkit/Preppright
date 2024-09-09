// src/pages/UploadCourseApproval.jsx

import React, { useState } from 'react';

const UploadCourseApproval = () => {
  const [courseId, setCourseId] = useState('');
  const [userId, setUserId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentConfirmationImage, setPaymentConfirmationImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('userId', userId);
    formData.append('transactionId', transactionId);
    if (paymentConfirmationImage) {
      formData.append('paymentConfirmationImage', paymentConfirmationImage);
    }

    try {
      const response = await fetch('/api/v1/course-approval/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Course approval registered successfully');
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Course Approval</h1>
      <input
        type="text"
        placeholder="Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="block mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="block mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Transaction ID (Optional)"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        className="block mb-2 p-2 border rounded"
      />
      <input
        type="file"
        onChange={(e) => setPaymentConfirmationImage(e.target.files[0])}
        className="block mb-2 p-2 border rounded"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default UploadCourseApproval;
