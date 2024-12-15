import express from 'express';
import { 
  getUnapprovedCourses, 
  approveCourse, 
  rejectCourse 
} from '../controllers/courseApprovalController.js';

const router = express.Router();

// Route to get all unapproved courses (admin only)
router.get(
  '/unapproved', 
  getUnapprovedCourses
);

// Route to approve a specific course (admin only)
router.patch(
  '/:courseId/approve', 
  approveCourse
);

// Route to reject/remove a course (admin only)
router.delete(
  '/:courseId/reject', 
  rejectCourse
);

export default router;