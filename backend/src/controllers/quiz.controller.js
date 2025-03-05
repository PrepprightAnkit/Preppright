import mongoose from "mongoose";
import { Quiz } from "../models/quiz.model.js";
import { User } from "../models/student.models.js";

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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, questions, description, duration, difficultyLevel } = req.body;
    
    // Validate that each question has one correct answer
    const questionsValid = questions.every(question => 
      question.options.filter(option => option.isCorrect).length === 1
    );

    if (!questionsValid) {
      throw new Error("Each question must have exactly one correct answer");
    }

    const quiz = new Quiz({
      title,
      questions,
      description,
      duration,
      difficultyLevel,
      createdBy: req.user._id, // Assuming you have user info in request
      isPublished: true
    });

    const savedQuiz = await quiz.save({ session });

    await session.commitTransaction();
    
    return res.status(201).json({
      success: true,
      data: savedQuiz
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      success: false,
      message: error.message
    });
  } finally {
    session.endSession();
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

export const submitQuiz = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { quizId, userId, answers } = req.body;

    // Validate required fields
    if (!quizId || !userId || !answers || !Array.isArray(answers)) {
      throw new Error('Missing required fields');
    }

    // Find quiz and user
    const [quiz, user] = await Promise.all([
      Quiz.findById(quizId),
      User.findById(userId)
    ]);

    if (!quiz) {
      throw new Error('Quiz not found');
    }

    if (!user) {
      throw new Error('User not found');
    }

    // Calculate score
    let correctCount = 0;
    const results = quiz.questions.map(question => {
      const answer = answers.find(a => a.questionId === question._id.toString());
      const selectedOption = question.options.find(
        opt => opt._id.toString() === answer?.selectedOptionId
      );
      
      const isCorrect = selectedOption?.isCorrect || false;
      if (isCorrect) correctCount++;

      return {
        questionId: question._id,
        correct: isCorrect,
        selectedAnswer: answer?.selectedOptionId
      };
    });

    const finalScore = (correctCount / quiz.questions.length) * 100;

    // Update user's quiz history
    const quizAttempt = {
      quiz: quizId,
      score: finalScore,
      takenAt: new Date(),
      answers: results
    };

    // Update or add quiz attempt to user's history
    if (!user.quizzes) {
      user.quizzes = [];
    }

    const existingAttemptIndex = user.quizzes.findIndex(
      q => q.quiz.toString() === quizId
    );

    if (existingAttemptIndex >= 0) {
      user.quizzes[existingAttemptIndex] = quizAttempt;
    } else {
      user.quizzes.push(quizAttempt);
    }

    // Save changes
    await user.save({ session });
    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      score: finalScore,
      results
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Quiz submission error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit quiz'
    });
  } finally {
    session.endSession();
  }
};
