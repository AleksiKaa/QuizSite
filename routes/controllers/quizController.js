import * as quizService from "../../services/quizService.js"
import * as questionService from "../../services/questionService.js"

const randomPage = async ({ render, state, response }) => {

    const question = await quizService.getRandomQuestion()

    //muuta johonki viisaaseen
    if (!question) return response.body = "no questions yet"

    response.redirect(`/quiz/${question.id}`)
}

const showPage = async ({ params, render }) => {
    const id = params.id

    const data = {
        question: await questionService.getQuestion(id),
        options: await questionService.getAnswerOptions(id)
    }

    render("quiz.eta", data)
}

const answerQuiz = async ({ state, params, response }) => {
    const questionId = params.id
    const answerOptionId = params.optionId
    const userId = (await state.session.get("user")).id
    const correct = (await quizService.getAnswerOption(answerOptionId)).is_correct

    await quizService.addAnswer(userId, questionId, answerOptionId, correct)

    if (correct === true) response.redirect(`/quiz/${questionId}/correct`)
    else response.redirect(`/quiz/${questionId}/incorrect`)

}

const showCorrect = async ({ render }) => {
    render("correct.eta")
}

const showIncorrect = async ({ render, params }) => {
    const id = params.id
    const correct = await quizService.getCorrectOption(id)

    render("incorrect.eta", {answers: correct})
}

export { randomPage, showPage, answerQuiz, showCorrect, showIncorrect }