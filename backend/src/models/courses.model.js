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
  // category
  courseType: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true // make it required if you want every course to have a category
  },
  rating: {
    type: Number,
    default: 4.8
  },
  duration: {
    type: Number,
    default: '6'
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
 
  aboutTitle:{
    type: String,
    required: true
  },
  aboutDescription:{
    type: String,
    required: true
  },
  aboutImgUrl:{
    type: String,
    required: true
  },



  // Syllabus
  syllabus: [SyllabusSectionSchema],

 

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
