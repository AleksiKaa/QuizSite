import * as questionService from "../../services/questionService.js"
import { REDIRECT_BACK } from "https://deno.land/x/oak/mod.ts";

import {
    minLength,
    required,
    validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = {
    text: [required, minLength(1)]
}

const submitAnswerOption = async ({ request, render, response, params, state }) => {
    const body = request.body()
    const formParams = await body.value

    const id = params.id
    const userIdquestions = (await questionService.getQuestion(id)).user_id
    const userId = (await state.session.get("user")).id

    if (userId != userIdquestions) return response.status = 401

    let checkbox = formParams.get("is_correct")

    if (checkbox === "on") checkbox = true
    else checkbox = false

    const data = {
        question: await questionService.getQuestion(id),
        answers: await questionService.getAnswerOptions(id),
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

const renderQuestionPage = async ({ render, params, response, state }) => {

    const id = params.id
    const userIdquestions = (await questionService.getQuestion(id)).user_id
    const userId = (await state.session.get("user")).id

    if (userId != userIdquestions) return response.status = 401

    render("question.eta", { question: await questionService.getQuestion(id), answers: await questionService.getAnswerOptions(id) })
}

const deleteAnswerOption = async ({ response, params }) => {

    const questionId = params.id
    const optionId = params.optionId

    await questionService.deleteOption(questionId, optionId)

    response.redirect(`/questions/${questionId}`)
}

export { renderQuestionPage, submitAnswerOption, deleteAnswerOption }