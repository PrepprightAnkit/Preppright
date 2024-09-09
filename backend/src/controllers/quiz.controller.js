import { Quiz } from "../models/quiz.model.js";
<<<<<<< HEAD
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
    const { quizId, userId, answers } = req.body; // answers should be an array of objects { questionId, selectedOptionId }

    // Find the quiz by its ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    // Calculate the score
    let score = 0;
    for (const answer of answers) {
      // Find the question by its identifier or question ID
      const question = quiz.questions.find(
        (q) => q._id.toString() === answer.questionId
      );

      if (question) {
        // Find the selected option within the question
        const selectedOption = question.options.find(
          (opt) => opt._id.toString() === answer.selectedOptionId
        );

        // Check if the selected option is correct
        if (selectedOption && selectedOption.isCorrect) {
          score += 1; // Increment the score for each correct answer
        }
      }
    }

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the quiz has already been taken
    const existingQuizRecord = user.quizzesTaken.find(
      (takenQuiz) => takenQuiz.quiz.toString() === quizId
    );

    if (existingQuizRecord) {
      // Update the existing score if the quiz has already been taken
      existingQuizRecord.score = score;
      existingQuizRecord.takenAt = new Date(); // Update the timestamp when the quiz was taken
    } else {
      // Add a new quiz record if not taken before
      user.quizzesTaken.push({ quiz: quizId, score, takenAt: new Date() });
    }

    // Save the updated user data
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
=======
import { Question } from "../models/questions.models.js";
import { User } from "../models/student.models.js";
import { Certificate } from "../models/certificate.models.js";
import { Option } from "../models/options.models.js";
// Function to create a quiz with detailed fields
export const createQuiz = async (req, res) => {
    try {
      const { title, description, questions } = req.body;
  
      // Create questions and options
      const questionIds = await Promise.all(
        questions.map(async (q) => {
          const options = await Promise.all(
            q.options.map((optionText, index) => {
              return new Option({
                text: optionText,
                isCorrect: index === q.correctOption,
              }).save();
            })
          );
  
          const question = new Question({
            text: q.text,
            options: options.map(option => option._id), // Only store the ObjectIds of options
          });
  
          return question.save(); // Save each question and return its ID
        })
      );
  
      // Create the quiz with the array of question IDs
      const quiz = new Quiz({
        title,
        description,
        questions: questionIds.map(q => q._id),
        createdBy: req.user._id,
      });
  
      await quiz.save();
      res.status(201).json({ quiz });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Function to update a question in a quiz
export const updateQuestion = async (req, res) => {
  try {
    const { quizId, questionId, updatedQuestion } = req.body;

    // Find the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // Check if the question is part of the quiz
    const questionIndex = quiz.questions.findIndex(q => q.toString() === questionId);
    if (questionIndex === -1) return res.status(404).json({ error: "Question not found" });

    // Update question details
    quiz.questions[questionIndex] = updatedQuestion;

    await quiz.save();
    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to submit a quiz and calculate score
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId).populate("questions");
    let score = 0;

    // Calculate the score based on correct answers
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const correctOption = question.options.find(option => option.isCorrect);
      if (correctOption && userAnswer === correctOption._id.toString()) {
        score += 1;
      }
    });

    // Create or update the certificate
    let certificate = await Certificate.findOne({ user: req.user._id, quiz: quiz._id });
    if (!certificate) {
      certificate = new Certificate({
        user: req.user._id,
        quiz: quiz._id,
        score,
        certificateURL: generateCertificateURL(req.user._id, quiz._id),
      });
      await certificate.save();
    } else {
      // Update existing certificate
      certificate.score = score;
      certificate.certificateURL = generateCertificateURL(req.user._id, quiz._id);
      await certificate.save();
    }

    // Update user's quizzesTaken
    const user = await User.findById(req.user._id);
    const quizIndex = user.quizzesTaken.findIndex(qt => qt.quiz.toString() === quiz._id.toString());
    if (quizIndex === -1) {
      user.quizzesTaken.push({
        quiz: quiz._id,
        score,
        certificate: certificate._id,
      });
    } else {
      user.quizzesTaken[quizIndex].score = score;
      user.quizzesTaken[quizIndex].certificate = certificate._id;
    }

    await user.save();

    res.status(200).json({ score, certificateURL: certificate.certificateURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate a certificate URL (stub)
const generateCertificateURL = (userId, quizId) => {
  // This is where the logic for generating and storing certificates would go
  return `https://certificates.example.com/${userId}-${quizId}.pdf`;
>>>>>>> 1cb8c2a3b262bdcc985090ead53cf08661763dc5
};
