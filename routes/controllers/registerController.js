import * as registerService from "../../services/registerService.js"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"
import {
    isEmail,
    minLength,
    required,
    validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = {
    email: [required, isEmail],
    password: [required, minLength(4)]
}

const showPage = async ({ render }) => {
    render("register.eta", {email: "", errors: null})
}

const registerAccount = async ({ request, response, render }) => {
    const body = request.body()
    const params = await body.value

    const data = {
        email: "",
        password: "", 
        errors: {}
    }

    data.email = params.get("email")
    data.password = params.get("password")

    const [passes, errors] = await validate(data, validationRules)

    if (!passes) {
        data.errors = errors
        render("register.eta", data)
    } else {

        if (registerService.emailExists(data.email) === true) {
            data.errors["email"] = {text: "This email is already registered"}
            return render("register.eta", data)
        }
        const hash = await bcrypt.hash(data.password)
        await registerService.register(data.email, hash)
        response.redirect("/auth/login")
    }
}

export { showPage, registerAccount }