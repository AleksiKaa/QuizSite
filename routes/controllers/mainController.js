import * as questionsService from "../../services/questionsService.js";

const showMain = async ({ render }) => {
  render("main.eta", {title: "", text: "", questions: await questionsService.getQuestions()});
};

export { showMain };
