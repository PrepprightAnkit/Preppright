import { Course } from '../models/courses.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from "fs"
export const createCourse = async (req, res) => {
  const { name, price, description, detailedDescription, numberOfLessons, level, categoryId } = req.body;
  const files = req.files;

  try {
    // Upload files to Cloudinary
    const uploadedFiles = await Promise.all(files.map(file => uploadOnCloudinary(file.path)));

    // Extract URLs from the uploaded files
    const fileUrls = uploadedFiles.map(file => file.secure_url);

    // Create a new course
    const course = new Course({
      name,
      price,
      description,
      detailedDescription,
      numberOfLessons,
      level,
      files: fileUrls.filter(url => url.endsWith('.pdf')), // Filter for PDFs
      videos: fileUrls.filter(url => url.endsWith('.mp4')), // Filter for videos
      category: categoryId,
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    // Clean up temporary files
    files.forEach(file => fs.unlinkSync(file.path));
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('category');
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate('category');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, detailedDescription, numberOfLessons, level, categoryId } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { name, price, description, detailedDescription, numberOfLessons, level, category: categoryId },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
