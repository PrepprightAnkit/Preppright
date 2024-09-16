import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ApproveCourse = () => {
  const [approvalRequests, setApprovalRequests] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Fetch the approval requests
    fetch(`${apiUrl}/api/v1/approve/getApproveCourse`)
      .then((response) => response.json())
      .then((data) => setApprovalRequests(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleApprove = (courseId, userId) => {
    // Send the POST request to approve the course
    fetch(`${apiUrl}/api/v1/approve/approveCourse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: courseId,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Course approved:', data);
        // Optionally, remove the approved item from the UI
        setApprovalRequests((prev) =>
          prev.filter(
            (request) => request.course._id !== courseId || request.user._id !== userId
          )
        );
      })
      .catch((error) => console.error('Error approving course:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-700 p-4 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/allCat" className="hover:underline">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/allCourse" className="hover:underline">
              Courses
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Course Approvals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvalRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">{request.user.fullName}</h2>
                <p className="text-sm text-gray-600 mb-4">{request.user.email}</p>
                <img
                  src={request.paymentConfirmationImage}
                  alt="Payment Confirmation"
                  className="mb-4 w-full h-48 object-cover rounded-md"
                />
                <p className="text-sm font-semibold">Transaction ID: {request.transactionId}</p>
              </div>
              <button
                onClick={() => handleApprove(request.course._id, request.user._id)}
                className="mt-4 bg-green-700 text-white text-lg font-bold py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApproveCourse;
