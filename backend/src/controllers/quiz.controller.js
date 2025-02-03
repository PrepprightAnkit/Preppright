import { Quiz } from "../models/quiz.model.js";
import mongoose from "mongoose";
import { User } from "../models/student.models.js"; // Ensure your User model exists

// Create an option
export const createOption = async (req, res) => {
  try {
    const { quizId, questionId, text, isCorrect } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    const question = quiz.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    question.options.push({ text, isCorrect });
    await quiz.save();
    res.status(201).json({ success: true, data: question.options });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a question and attach it to a quiz
export const createQuestion = async (req, res) => {
  try {
    const { quizId, identifier, question, image, options } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    // Use the options passed in (or default to an empty array)
    quiz.questions.push({ identifier, question, image, options: options || [] });
    await quiz.save();
    return res.status(201).json({ success: true, data: quiz.questions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};




// Create a quiz
export const createQuiz = async (req, res) => {
  try {
    const { title } = req.body;
    const quiz = new Quiz({ title, questions: [] });
    await quiz.save();
    res.status(201).json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    // We now take id from req.params instead of req.body
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    res.status(200).json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update questions in a quiz
export const updateQuestions = async (req, res) => {
  try {
    const { id, questions } = req.body;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    quiz.questions = questions;
    await quiz.save();
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update options in a specific question
export const updateOptions = async (req, res) => {
  try {
    const { id, questionId, options } = req.body;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    const question = quiz.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    question.options = options;
    await quiz.save();
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    if (!quizzes) {
      return res.status(404).json({ success: false, message: "No quizzes found" });
    }
    res.status(200).json({ success: true, data: quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all questions for a quiz
export const getAllQuestions = async (req, res) => {
  const { quizId } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    return res.status(200).json({ success: true, data: quiz.questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Submit a quiz: the client sends the quizId, userId, and answers array.
// The backend calculates the score and updates the user's record.
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, userId, answers } = req.body; 
    // answers: [{ questionId, selectedOptionId }, ...]
    
    // Find the quiz by its ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    
    // Calculate score by iterating through each answer
    let correctCount = 0;
    quiz.questions.forEach((question) => {
      const answer = answers.find(
        (a) => a.questionId === question._id.toString()
      );
      if (answer) {
        const selectedOption = question.options.find(
          (opt) => opt._id.toString() === answer.selectedOptionId
        );
        if (selectedOption && selectedOption.isCorrect) {
          correctCount += 1;
        }
      }
    });
    const score = (correctCount / quiz.questions.length) * 100;
    
    // Update the user record with the quiz attempt
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    // Assume user.quizzesTaken is an array of objects: { quiz: ObjectId, score: Number, takenAt: Date }
    const existingQuizRecord = user.quizzesTaken.find(
      (record) => record.quiz.toString() === quizId
    );
    if (existingQuizRecord) {
      existingQuizRecord.score = score;
      existingQuizRecord.takenAt = new Date();
    } else {
      user.quizzesTaken.push({ quiz: quizId, score, takenAt: new Date() });
    }
    
    await user.save();
    res.status(200).json({ success: true, score });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
