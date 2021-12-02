import * as questionService from "../../services/questionService.js"
import {
    minLength,
    required,
    validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = {
    text: [required, minLength(1)]
}

const submitAnswerOption = async ({ request, render, response, params }) => {
    const body = request.body()
    const formParams = await body.value

    const id = params.id

    let checkbox = formParams.get("is_correct")

    if (checkbox != true) checkbox = false

    const data = {
        question: await questionService.getQuestion(id),
        answers: await questionService.getAnswerOptions(id) ,
        text: formParams.get("option_text"),
        errors: null
    }

    const [passes, errors] = await validate(data, validationRules)

    if (!passes) {
        data.errors = errors
        render("question.eta", data)
    } else {
        await questionService.addAnswerOption(id, data.text, checkbox)
        response.redirect(`/questions/${id}`)
    }
}

//user credentials
const renderQuestionPage = async ({ render, params }) => {
    
    const id = params.id

    render("question.eta", {question: await questionService.getQuestion(id), answers: await questionService.getAnswerOptions(id)})
}

export { renderQuestionPage, submitAnswerOption }