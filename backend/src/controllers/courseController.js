import { Course } from '../models/courses.model.js';

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json({
      message: 'Course created successfully',
      course: savedCourse
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating course', 
      error: error.message 
    });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching courses', 
      error: error.message 
    });
  }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching course', 
      error: error.message 
    });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating course', 
      error: error.message 
    });
  }
};

// Partial update of a course
export const partialUpdateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({
      message: 'Course partially updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error partially updating course', 
      error: error.message 
    });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({
      message: 'Course deleted successfully',
      course: deletedCourse
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting course', 
      error: error.message 
    });
  }
};

// Get course by type
export const getCourseByType = async (req, res) => {
  try {
    const courses = await Course.find({ courseType: req.params.courseType });
    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this type' });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching courses by type', 
      error: error.message 
    });
  }
};