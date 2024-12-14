import mongoose from 'mongoose';

// Syllabus Module Schema
const SyllabusModuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Syllabus Section Schema
const SyllabusSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  modules: [SyllabusModuleSchema]
});

// Course Feature Schema
const CourseFeatureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Course Project Schema
const CourseProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Certification Schema
const CertificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Instructor Schema
const InstructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

// Review Schema
const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  image: {
    type: String
  }
});

// Main Course Schema
const CourseSchema = new mongoose.Schema({
  // Hero Section Details
  title: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  courseType: {
    type: String,
    default: 'Machine Learning'
  },
  rating: {
    type: Number,
    default: 4.8
  },
  duration: {
    type: String,
    default: '6 Months'
  },
  totalCourseFee: {
    type: Number,
    required: true
  },
  projectCount: {
    type: Number,
    default: 3
  },
  placementAssistance: {
    type: Boolean,
    default: true
  },
  economicImpact: {
    type: String,
    default: '$15.7 trillion'
  },

  // Syllabus
  syllabus: [SyllabusSectionSchema],

  // Learning Journey Features
  courseFeatures: [CourseFeatureSchema],

  // Projects
  courseProjects: [CourseProjectSchema],

  // Certifications
  certifications: [CertificationSchema],

  // Instructors
  instructors: [InstructorSchema],

  // Reviews
  reviews: [ReviewSchema],

  // Additional Course Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

export const Course = mongoose.model('Course', CourseSchema);
