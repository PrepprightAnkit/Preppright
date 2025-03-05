import mongoose, { Schema } from "mongoose";

const optionSchema = new Schema({
  text: { 
    type: String, 
    required: [true, 'Option text is required'],
    trim: true
  },
  isCorrect: { 
    type: Boolean, 
    default: false 
  }
});

// Add validation to ensure at least one option is marked as correct
optionSchema.pre('save', function(next) {
  if (this.isCorrect) {
    next();
  } else {
    const error = new Error('At least one option must be marked as correct');
    next(error);
  }
});

const questionSchema = new Schema({
  identifier: { 
    type: Number,
    required: true,
    min: [1, 'Identifier must be greater than 0']
  },
  question: { 
    type: String, 
    required: [true, 'Question text is required'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters long']
  },
  image: { 
    type: String,
    required: false
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function(options) {
        return options.length >= 2; // Minimum 2 options required
      },
      message: 'At least 2 options are required'
    }
  }
});

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long']
    },
    description: {
      type: String,
      default: ''
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function(questions) {
          return questions.length > 0;
        },
        message: 'Quiz must have at least one question'
      }
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number, // Duration in minutes
      default: 30
    },
    difficultyLevel: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    }
  },
  { 
    timestamps: true 
  }
);

// Indexes for better query performance
quizSchema.index({ title: 1, createdBy: 1 });
quizSchema.index({ isPublished: 1 });

export const Quiz = mongoose.model("Quiz", quizSchema);
