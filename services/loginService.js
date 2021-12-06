import { executeQuery } from "../database/database.js";

const getUserData = async (email) => {
    const res = await executeQuery(
    "SELECT * FROM users WHERE email = $1",
    email
    )

    return res.rows
}

export { getUserData }