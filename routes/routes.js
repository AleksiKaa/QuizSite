import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsController from "./controllers/questionsController.js"
import * as questionController from "./controllers/questionController.js"
import * as registerController from "./controllers/registerController.js"
import * as loginController from "./controllers/loginController.js"
import * as quizController from "./controllers/quizController.js"
import * as statisticsController from "./controllers/statisticsController.js"
import * as questionApi from "./apis/questionApi.js"

const router = new Router();

router.get("/", mainController.showMain)
router.get("/questions", questionsController.showQuestions);
router.get("/questions/:id", questionController.renderQuestionPage)
router.get("/auth/register", registerController.showPage)
router.get("/auth/login", loginController.showPage)
router.get("/quiz", quizController.randomPage)
router.get("/quiz/:id", quizController.showPage)
router.get("/quiz/:id/correct", quizController.showCorrect)
router.get("/quiz/:id/incorrect", quizController.showIncorrect)
router.get("/statistics", statisticsController.getStatistics)
router.get("/api/questions/random", questionApi.getQuestion)
router.post("/questions", questionsController.submitQuestion)
router.post("/questions/:id/options", questionController.submitAnswerOption)
router.post("/questions/:id/options/:optionId/delete", questionController.deleteAnswerOption)
router.post("/questions/:id/delete", questionsController.removeQuestion)
router.post("/auth/register", registerController.registerAccount)
router.post("/auth/login", loginController.authenticate)
router.post("/quiz/:id/options/:optionId", quizController.answerQuiz)
router.post("/api/questions/answer", questionApi.answerQuestion)

export { router };
