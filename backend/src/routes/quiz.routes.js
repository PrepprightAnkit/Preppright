<<<<<<< HEAD
import express from "express";
import {
  createQuiz,
  deleteQuiz,
  createQuestion,
  createOption,
  updateQuestions,
  updateOptions,
  getAllQuizzes,
  getAllQuestions,
  submitQuiz
} from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/quizzes", createQuiz);
router.get("/quizzes", getAllQuizzes); // Add this line
router.delete("/quizzes/:id", deleteQuiz);
router.post("/quizzes/questions", createQuestion);
router.post("/quizzes/options", createOption);
router.put("/quizzes/upquestions", updateQuestions);
router.put("/quizzes/questions/options", updateOptions);
router.post("/quizzes/getallquestions", getAllQuestions);
router.post("/quizzes/submit", submitQuiz);

=======
import { Router } from "express";
import { 
    createQuiz, 
    updateQuestion, 
    submitQuiz 
} from "../controllers/quiz.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router();

// Route to create a new quiz
router.route("/create").post(
    verifyJWT,
    upload.fields([
        // Define fields if you need to upload images or other files related to quizzes
        {
            name: "quizImage", // Example field, adjust as necessary
            maxCount: 1
        }
    ]),
    createQuiz
);

// Route to update a question in a quiz
router.route("/update-question").patch(
    verifyJWT,
    updateQuestion
);

// Route to submit a quiz and calculate score
router.route("/submit").post(
    verifyJWT,
    submitQuiz
);
>>>>>>> 1cb8c2a3b262bdcc985090ead53cf08661763dc5

export default router;
