import { executeQuery } from "../database/database.js";

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const getRandomQuestion = async () => {
    const res = await executeQuery(
        "SELECT * FROM questions"
    )

    const randomInt = getRandomInt(res.rows.length)

    return res.rows[randomInt]
}

const addAnswer = async (userId, questionId, answerOptionId, correct) => {
    await executeQuery(
        "INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1, $2, $3, $4)",
        userId,
        questionId,
        answerOptionId,
        correct
    )
}

const getAnswerOption = async (id) => {

    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE id = $1",
        id
    )
    return res.rows[0]
}

const getAnswerOptions = async (id) => {

    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $1",
        id
    )
    return res.rows
}

const getCorrectOption = async (id) => {

    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = true",
        id
    )
    return res.rows
}

export { getRandomInt, getRandomQuestion, addAnswer, getAnswerOption, getAnswerOptions, getCorrectOption }