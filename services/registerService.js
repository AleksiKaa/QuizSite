import { executeQuery } from "../database/database.js";

const register = async (email, password) => {
    await executeQuery(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        email,
        password
    )
}

const emailExists = async (email) => {
    const res = await executeQuery(
        "SELECT * FROM users WHERE email = $1",
        email
    )

    if (res.rows.length === 0) return false
    else return true
}

export { register, emailExists }