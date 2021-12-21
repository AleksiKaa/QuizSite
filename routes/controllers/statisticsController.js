import * as statisticsService from "../../services/statisticsService.js"

const getStatistics = async ({ state, render }) => {

    const id = (await state.session.get("user")).id

    const data = {
        answerCount: await statisticsService.answerCount(id),
        correctAnswers: await statisticsService.correctAnswerCount(id),
        answerAmount: await statisticsService.answerAmount(id),
        mostAnswers: (await statisticsService.mostAnswers()).slice(0, 5)
    }

    render("statistics.eta", data)

}

export { getStatistics }