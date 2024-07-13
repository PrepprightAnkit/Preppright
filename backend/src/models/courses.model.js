import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  topics: [TopicSchema],
});

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
  image: {
    type: String,
    required: true,
  },
  files: [{
    type: String,
    required: true,
  }],
  videos: [{
    type: String,
    required: true,
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  lessons: {
    type: [LessonSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  freeVideo: {
    type: String,
    required: true,
  },
  freeNotes: {
    type: String,
    required: true,
  },
  courseIntroVideo: {
    type: String,
    required: true,
  },
});

export const Course = mongoose.model('Course', CourseSchema);
