import { executeQuery } from "../database/database.js";

const answerCount = async (userId) => {
    const res = await executeQuery(
        "SELECT COUNT (id) FROM question_answers WHERE user_id = $1",
        userId
    )

    return res.rows[0]
}

const correctAnswerCount = async (userId) => {
    const res = await executeQuery(
        "SELECT COUNT (id) FROM question_answers WHERE user_id = $1 AND correct = true",
        userId
    )

    return res.rows[0]
}

const answerAmount = async (userId) => {
    const res = await executeQuery(
        "SELECT COUNT (question_answers.id) FROM question_answers INNER JOIN questions ON question_answers.question_id = questions.id AND questions.user_id = $1",
        userId
    )
    return res.rows[0]
}

const mostAnswers = async () => {
    const res = await executeQuery(
        "SELECT email, user_id, count FROM users INNER JOIN (SELECT user_id, COUNT (user_id) FROM question_answers GROUP BY user_id ORDER BY COUNT DESC) AS dt ON users.id = user_id"
    )

    return res.rows
}



export { answerCount, correctAnswerCount, answerAmount, mostAnswers }