import { executeQuery } from "../database/database.js";

//add usershit
const getQuestions = async (userId) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE user_id = $1",
        //userId
        1
    )

    return res.rows
}

const addQuestion = async (title, text, userId) => {
    await executeQuery(
        "INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3)",
        userId,
        title,
        text
    )
}

export { getQuestions, addQuestion }