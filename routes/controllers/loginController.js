import * as loginService from "../../services/loginService.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"

const showPage = ({ render }) => {
    render("login.eta", { email: "" })
}

//test@test.fi  password
const authenticate = async ({ request, response, render, state }) => {
    const body = request.body()
    const params = await body.value

    const email = params.get("email")
    const password = params.get("password")

    const userData = await loginService.getUserData(email)

    if (userData.length === 0) {
            console.log("ei oo")
        return
    }

    const userObj = userData[0]
    const hash = userObj.password

    const correctPassword = await bcrypt.compare(password, hash)
    if (!correctPassword) {
            console.log("väärä")
        return
    }

        console.log("oikein")
    await state.session.set("authenticated", true);
    await state.session.set("user", {
        id: userObj.id,
        email: userObj.email,
    })
    response.redirect("/questions")
}

export { showPage, authenticate }