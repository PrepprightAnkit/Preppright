import mongoose from "mongoose"; 
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    required: true,
    maxlength: 200,
  },
  numberOfStudents: {
    type: Number,
    default: 0,
  },
  numberOfLessons: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  files: [{
    type: String,
  }],
  videos: [{
    type: String,
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model('Course', CourseSchema);


