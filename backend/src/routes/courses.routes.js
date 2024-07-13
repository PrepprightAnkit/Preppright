import { Router } from "express";
import { uploadCourse } from "../controllers/courses.controller.js";
import { getCourses } from '../controllers/getCourses.controller.js';
import { upload } from "../middlewares/upload.js";
import { getCourseById } from "../controllers/getCoursesMain.js";


const router = Router();

router.route('/courses').get(
  getCourses
);

router.route('/courses/:id').get(
  getCourseById
);

router.route('/courses').post(
  upload,
  uploadCourse
);

export default router;
