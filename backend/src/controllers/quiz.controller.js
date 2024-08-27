import { Quiz } from "../models/quiz.model.js";
import mongoose from "mongoose";

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
    const { quizId, identifier, question, image } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    quiz.questions.push({ identifier, question, image, options: [] });

    await quiz.save();
    res.status(201).json({ success: true, data: quiz.questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    const { id } = req.body;

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

// Fetch a quiz by its ID
export const getQuizById = async (req, res) => {
  try {
    const { id } = req.body;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch a specific question by its ID within a quiz
export const getQuestionById = async (req, res) => {
  try {
    const { quizId, questionId } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    const question = quiz.questions.id(questionId);

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const submitQuiz = async (req, res) => {
  try {
    const { quizId, userId, answers } = req.body;  // answers should be an array of objects { questionId, selectedOptionId }

    // Find the quiz by its ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    // Calculate the score
    let score = 0;
    for (const answer of answers) {
      const question = quiz.questions.id(answer.questionId);
      if (question) {
        const selectedOption = question.options.id(answer.selectedOptionId);
        if (selectedOption && selectedOption.isCorrect) {
          score += 1;
        }
      }
    }

    // Store the score in the user's record
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.quizes.push({ quiz: quizId, score });
    await user.save();

    res.status(200).json({ success: true, score });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

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



export const getAllQuestions = async (req, res) => {
  const { quizId } = req.body;

  try {
    // Find the quiz by its ID
    const quiz = await Quiz.findById(quizId)

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    // Respond with the questions
    return res.status(200).json({ success: true, data: quiz.questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
