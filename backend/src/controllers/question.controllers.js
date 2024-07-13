import { Question } from "../models/question.models.js";
import { asyncHandler } from "../utils/asynchandler.js";

const askQuestion = asyncHandler(async (req, res) => {
  console.log("In askQuestion");

  const { question } = req.body;

  console.log("Obtained question ", question);
  if (!question) {
    console.log("Enter question");
  }

  const putQuestion = await Question.create({ question, author: req.user._id });

  if (!putQuestion) {
    console.log("Did not receive question");
  }
  console.log(putQuestion);

  const getQuestion = await Question.findById(putQuestion._id);

  return res.status(200).json(getQuestion);
});

const like = asyncHandler(async (req, res) => {
    console.log("In like controller");
    const questionId = req.params.id;
  
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $inc: { likes: 1 } },
      { new: true }
    );
  
    if (!question) {
      console.log("Question not found");
      return res.status(404).json({ error: "Question not found" });
    }
  
    return res.status(200).json(question);
  });

const getQuestionsPublic = asyncHandler(async (req, res) => {
  const questions = await Question.find({}).populate("answer");

  if (!questions) {
    console.log("Questions not found");
    res.status(404);
  } 
  console.log(questions);

  return res.status(200).json(questions);
});

const deleteQuestion = asyncHandler(async (req, res) => {
    console.log('In deleteQuestion controller')
    const id = req.params.id
    const delQuestion = await Question.findByIdAndDelete(id)
    return res.status(200)
})

export { askQuestion, getQuestionsPublic, like, deleteQuestion };