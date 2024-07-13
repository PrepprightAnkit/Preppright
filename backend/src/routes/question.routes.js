import { Router } from "express";
import { checkAdmin, verifyJWT } from "../middlewares/auth.middelwares.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { askQuestion,getQuestionsPublic, like, deleteQuestion } from "../controllers/question.controllers.js";

const questionRouter = Router()

questionRouter.route("/questionPublic").post(verifyJWT, asyncHandler( async(req,res) => {
    console.log("In /question");
    const received = await askQuestion(req,res)
    console.log(received);
    res.json(askQuestion)
} ))

questionRouter.route("/getQuestions").get(verifyJWT, asyncHandler( async(req,res) => {
    console.log("In /getQuestions");
    const received = await getQuestionsPublic(req,res)
    console.log(received)
    res.json(received);
} ))

questionRouter.route("/like/:id").post(verifyJWT, asyncHandler( async(req, res) => {
    console.log("In /like route");
    const question = await like(req, res)
    res.json(question)
}))

questionRouter.route("/delQuestion/:id").post(verifyJWT, checkAdmin, asyncHandler( async(req, res) => {
    console.log("In /delQuestion route");
    await deleteQuestion(req, res);
    res.status(200)
}))

export {questionRouter}