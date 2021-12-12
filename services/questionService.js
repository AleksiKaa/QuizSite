import { executeQuery } from "../database/database.js";

const getQuestion = async (id) => {

    const res = await executeQuery(
        "SELECT * FROM questions WHERE id = $1",
        id
    )
    return res.rows[0]
}

const addAnswerOption = async (questionId, text, correct) => {
    await executeQuery(
        "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3)",
        questionId,
        text,
        correct
    )
}

const getAnswerOptions = async (id) => {

    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $1",
        id
    )
    return res.rows
}

const deleteOption = async (questionId, optionId) => {

    await executeQuery(
        "DELETE FROM question_answers WHERE question_answer_option_id = $1",
        optionId
    )

    await executeQuery(
        "DELETE FROM question_answer_options WHERE question_id = $1 AND id = $2",
        questionId,
        optionId
    )
}

export { getQuestion, addAnswerOption, getAnswerOptions, deleteOption }