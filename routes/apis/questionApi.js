import * as quizService from "../../services/quizService.js"

const getQuestion = async ({ response }) => {

    const question = await quizService.getRandomQuestion()

    if (!question) response.body = {}

    const answerOptions = await quizService.getAnswerOptions(question.id)
    const optionsArray = []

    answerOptions.forEach(e => {
        optionsArray.push({ optionId: e.id, optionText: e.option_text })
    })

    const data = {
        questionId: question.id,
        questionTitle: question.title,
        questionText: question.question_text,
        answerOptions: optionsArray
    }

    response.body = data
}

const answerQuestion = async ({ request, response }) => {

    const body = request.body({ type: "json" })
    const content = await body.value

    const correctAnswers = await quizService.getCorrectOption(content.questionId)

    for (let i = 0; i < correctAnswers.length; i++) {
        const e = correctAnswers[i]
        if (Number(e.id) === Number(content.optionId)) return response.body = { correct: true }
    }

    response.body = { correct: false }

}

export { getQuestion, answerQuestion }