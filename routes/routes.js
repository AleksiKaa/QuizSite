import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsController from "./controllers/questionsController.js"
import * as questionController from "./controllers/questionController.js"
import * as registerController from "./controllers/registerController.js"

const router = new Router();

router.get("/questions", mainController.showMain);
router.get("/questions/:id", questionController.renderQuestionPage)
router.get("/auth/register", registerController.showPage)
router.post("/questions", questionsController.submitQuestion)
router.post("/questions/:id/options", questionController.submitAnswerOption)
router.post("/questions/:id/options/:optionId/delete", questionController.deleteAnswerOption)
router.post("/questions/:id/delete", questionsController.removeQuestion)
router.post("/auth/register", registerController.registerAccount)

export { router };
