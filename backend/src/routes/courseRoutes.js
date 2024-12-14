import express from 'express';
import * as courseController from '../controllers/courseController.js';

const router = express.Router();

// Create a new course
router.post('/', courseController.createCourse);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a single course by ID
router.get('/:id', courseController.getCourseById);

// Update a course
router.put('/:id', courseController.updateCourse);

// Delete a course
router.delete('/:id', courseController.deleteCourse);

// Get course by type (e.g., Machine Learning)
router.get('/type/:courseType', courseController.getCourseByType);

// Partial update of a course
router.patch('/:id', courseController.partialUpdateCourse);

export default router;