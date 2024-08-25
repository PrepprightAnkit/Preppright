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

export default router;
