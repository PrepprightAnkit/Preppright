import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { courseApprovalService } from './courseApprovalApiService';

const CourseApprovalPage = () => {
  const [unapprovedCourses, setUnapprovedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch unapproved courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const courses = await courseApprovalService.getUnapprovedCourses();
        setUnapprovedCourses(courses);
      } catch (error) {
        alert('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course approval
  const handleApproveCourse = async (courseId) => {
    try {
      await courseApprovalService.approveCourse(courseId);
      setUnapprovedCourses(prev => 
        prev.filter(course => course._id !== courseId)
      );
      alert('Course approved successfully');
    } catch (error) {
      alert('Failed to approve course');
    }
  };

  // Handle course rejection
  const handleRejectCourse = async (courseId) => {
    try {
      await courseApprovalService.rejectCourse(courseId);
      setUnapprovedCourses(prev => 
        prev.filter(course => course._id !== courseId)
      );
      alert('Course rejected successfully');
    } catch (error) {
      alert('Failed to reject course');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClockIcon className="animate-spin w-12 h-12" />
      </div>
    );
  }

  // Render empty state
  if (unapprovedCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h2 className="text-2xl font-bold">
          No Courses Pending Approval
        </h2>
        <p>All courses have been reviewed</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Course Approval Dashboard
      </h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unapprovedCourses.map(course => (
          <div key={course._id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              Submitted by: {course.submittedBy?.name || 'Unknown'}
            </p>
            <div className="flex justify-between space-x-2">
              <button 
                className="flex-1 bg-green-500 text-white py-2 rounded"
                onClick={() => handleApproveCourse(course._id)}
              >
                <CheckCircleIcon className="inline mr-2" />
                Approve
              </button>
              <button 
                className="flex-1 bg-red-500 text-white py-2 rounded"
                onClick={() => handleRejectCourse(course._id)}
              >
                <XCircleIcon className="inline mr-2" />
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseApprovalPage;