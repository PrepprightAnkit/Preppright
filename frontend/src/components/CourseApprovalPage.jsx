import React, { useEffect, useState } from 'react';

const CourseApprovalPage = () => {
  const [approvals, setApprovals] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch course approvals on component mount
  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/approve/getApproveCourse`);
        const result = await response.json();

        if (result.success) {
          setApprovals(result.data);
        } else {
          console.error('Failed to fetch course approvals:', result.message);
        }
      } catch (error) {
        console.error('Error fetching course approvals', error);
      }
    };

    fetchApprovals();
  }, []);

  // Handle course approval
  const handleApprove = async (userId, courseId) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/approve/approveCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, courseId }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Course approved successfully');
        setErrorMessage(''); // Clear any previous errors
      } else {
        setMessage(''); // Clear success message if there is an error
        setErrorMessage(result.message || 'Error approving course');
      }
    } catch (error) {
      console.error('Error approving course', error);
      setMessage(''); // Clear success message if there is an error
      setErrorMessage('Error approving course');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Course Approvals</h1>
      {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
      {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
      <div className="space-y-4">
        {approvals.map((approval) => (
          <div key={approval._id} className="border-2 border-green-500 p-4 rounded-lg shadow-md bg-green-50">
            <h2 className="text-xl font-semibold text-blue-700">{approval.user.fullName}</h2>
            <p className="text-gray-600">Email: {approval.user.email}</p>
            <p className="text-gray-600">Transaction ID: {approval.transactionId}</p>
            {approval.paymentConfirmationImage && (
              <img
                src={approval.paymentConfirmationImage}
                alt="Payment Confirmation"
                className="mt-2 mb-4 w-full h-48 object-cover rounded-lg"
              />
            )}
            <button
              onClick={() => handleApprove(approval.user._id, approval.course._id)}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 w-full text-center"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseApprovalPage;
