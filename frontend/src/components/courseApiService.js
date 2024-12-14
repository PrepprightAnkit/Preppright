import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1/users/courses';

export const courseService = {
  // Fetch a single course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/users/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course details:', error);
      throw error;
    }
  }
};