import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsController from "./controllers/questionsController.js"
import * as questionController from "./controllers/questionController.js"

const router = new Router();

router.get("/questions", mainController.showMain);
router.post("/questions", questionsController.submitQuestion)
router.get("/questions/:id", questionController.renderQuestionPage)
router.post("/questions/:id/options", questionController.submitAnswerOption)

export { router };
