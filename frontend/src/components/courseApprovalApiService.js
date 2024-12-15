import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const courseApprovalService = {
  // Fetch unapproved courses
  getUnapprovedCourses: async () => {
    try {
      const response = await api.get('api/v1/approve/unapproved');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch unapproved courses:', error);
      throw error;
    }
  },

  // Approve a course
  approveCourse: async (courseId) => {
    try {
      const response = await api.patch(`api/v1/approve/${courseId}/approve`);
      console.log(response)
      return response.data.data;
    }  catch (error) {
      console.error('Error in approveCourse:', error);
      res.status(500).json({
        success: false,
        error: 'Server error while approving course'
      });
    }},

  // Reject a course
  rejectCourse: async (courseId) => {
    try {
      const response = await api.delete(`api/v1/approve/${courseId}/reject`);
      return response.data;
    } catch (error) {
      console.error(`Failed to reject course ${courseId}:`, error);
      throw error;
    }
  }
};