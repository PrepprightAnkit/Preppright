import { Quiz } from "../models/quiz.model.js";
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
};
