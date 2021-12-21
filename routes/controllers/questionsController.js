import * as questionsService from "../../services/questionsService.js"
import {
    minLength,
    required,
    validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = {
    title: [required, minLength(1)],
    text: [required, minLength(1)]
}

const submitQuestion = async ({ request, render, response, state }) => {
    const body = request.body()
    const params = await body.value

    const userId = (await state.session.get("user")).id

    const data = {
        title: "",
        text: "",
        questions: await questionsService.getQuestions(userId),
        errors: null
    }

    data.title = params.get("title")
    data.text = params.get("question_text")

    const [passes, errors] = await validate(data, validationRules)

    if (!passes) {
        data.errors = errors
        render("questions.eta", data)
    } else {
        await questionsService.addQuestion(data.title, data.text, userId)
        response.redirect("/questions")
    }
}

const removeQuestion = async ({ response, params }) => {

    await questionsService.deleteQuestion(params.id)

    response.redirect("/questions")
}

const showQuestions = async ({ render, state, response }) => {

    const auth = await state.session.get("authenticated")

    if (!auth) return response.redirect("/auth/login")

    const id = (await state.session.get("user")).id

    render("questions.eta", {
        title: "",
        text: "",
        questions: await questionsService.getQuestions(id)
    })
}

export { submitQuestion, removeQuestion, showQuestions }