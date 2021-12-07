import * as questionsService from "../../services/questionsService.js";

const showMain = async ({ render, state }) => {

  const id = (await state.session.get("user")).id

  render("main.eta", {title: "",
                      text: "",
                      questions: await questionsService.getQuestions(id)})
}

export { showMain }
