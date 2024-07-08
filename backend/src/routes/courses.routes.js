import express from 'express';
import multer from 'multer';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/courses.controller.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/course', upload.array('files'), createCourse);
router.get('/course', getAllCourses);
router.get('/course:id', getCourseById);
router.put('/course:id', updateCourse);
router.delete('/course:id', deleteCourse);

export default router;
