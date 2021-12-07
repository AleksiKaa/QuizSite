import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsController from "./controllers/questionsController.js"
import * as questionController from "./controllers/questionController.js"
import * as registerController from "./controllers/registerController.js"
import * as loginController from "./controllers/loginController.js"

const router = new Router();

router.get("/", mainController.showMain)
router.get("/questions", questionsController.showQuestions);
router.get("/questions/:id", questionController.renderQuestionPage)
router.get("/auth/register", registerController.showPage)
router.get("/auth/login", loginController.showPage)
router.post("/questions", questionsController.submitQuestion)
router.post("/questions/:id/options", questionController.submitAnswerOption)
router.post("/questions/:id/options/:optionId/delete", questionController.deleteAnswerOption)
router.post("/questions/:id/delete", questionsController.removeQuestion)
router.post("/auth/register", registerController.registerAccount)
router.post("/auth/login", loginController.authenticate)

export { router };
