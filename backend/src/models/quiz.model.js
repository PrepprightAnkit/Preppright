import mongoose, { Schema } from "mongoose";

<<<<<<< HEAD
const optionSchema = new Schema({
  text: { 
    type: String, 
    required: true 
  },
  isCorrect: { 
    type: Boolean, 
    required: true, 
    default: false 
  }
});

const questionSchema = new Schema({
  identifier: { 
    type: Number, 
    required: true 
  },
  question: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String // URL or path to the image
  },
  options: [optionSchema]
});

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    questions: [questionSchema],
    score:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

=======
const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

>>>>>>> 1cb8c2a3b262bdcc985090ead53cf08661763dc5
export const Quiz = mongoose.model("Quiz", quizSchema);
