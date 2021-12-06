import * as questionsService from "../../services/questionsService.js";

import {
    minLength,
    required,
    validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = {
    title: [required, minLength(1)],
    text: [required, minLength(1)]
}

const submitQuestion = async ({ request, render, response }) => {
    const body = request.body()
    const params = await body.value

    const data = {
        title: "",
        text: "", 
        errors: null
    }

    data.title = params.get("title")
    data.text = params.get("question_text")

    const [passes, errors] = await validate(data, validationRules)

    if (!passes) {
        data.errors = errors
        render("main.eta", data)
    } else {
        //implement usershit
        await questionsService.addQuestion(data.title, data.text, Number(1))
        response.redirect("/questions")
    }
}

const removeQuestion = async ({ response, params }) => {
    
    await questionsService.deleteQuestion(params.id)

    response.redirect("/questions")
}

export { submitQuestion, removeQuestion }