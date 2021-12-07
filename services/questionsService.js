import { executeQuery } from "../database/database.js";

const getQuestions = async (userId) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE user_id = $1",
        userId
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

const deleteQuestion = async (id) => {
    await executeQuery(
        "DELETE FROM questions WHERE id = $1",
        id
    )
}

export { getQuestions, addQuestion, deleteQuestion }