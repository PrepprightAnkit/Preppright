import { Course } from '../models/courses.model.js';

// Get all unapproved courses
export const getUnapprovedCourses = async (req, res) => {
  try {
    const unapprovedCourses = await Course.find({ 
      isApproved: false 
    })
    .populate('courseType', 'name')  // Populate category
    .populate('submittedBy', 'name email');  // Populate submitter details

    res.status(200).json({
      success: true,
      count: unapprovedCourses.length,
      data: unapprovedCourses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error while fetching unapproved courses'
    });
  }
};

// Approve a course
export const approveCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const adminId = req.user._id;  // Assuming you have authentication middleware

    const course = await Course.findByIdAndUpdate(
      courseId, 
      {
        isApproved: true,
        approvedBy: adminId,
        approvedAt: new Date()
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course approved successfully',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error while approving course'
    });
  }
};

// Reject/Remove a course
export const rejectCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course rejected and removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error while rejecting course'
    });
  }
};