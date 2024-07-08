import { Router } from "express";
import { registerUser } from "../controllers/student.controllers.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    registerUser
);

export default router;
