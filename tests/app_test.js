import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { Application } from "../deps.js"
import { errorMiddleware } from "../middlewares/errorMiddleware.js"
import renderMiddleware from "../middlewares/renderMiddleware.js"
import { serveStaticMiddleware } from "../middlewares/serveStaticMiddleware.js"
import { router } from "../routes/routes.js"
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts"
import authMiddleware from "../middlewares/authMiddleware.js"

const session = new Session()
const app = new Application()

app.use(session.initMiddleware())
app.use(authMiddleware)
app.use(errorMiddleware)
app.use(serveStaticMiddleware)
app.use(renderMiddleware)
app.use(router.routes())

//ignore the duplicate test
//tests require a question with id = 1 and answer options with ids 6 and 7 and they have to have the values true and false

Deno.test("POST request to /api/questions/answer with correct answer option should return JSON {correct:false}", async () => {
    const testClient = await superoak(app)
    await testClient.post("/api/questions/answer")
    .send(JSON.parse('{"questionId": "1", "optionId":"7"}'))
    .expect({correct: "false"})
})

Deno.test("POST request to /api/questions/answer with correct answer option should return JSON {correct:false}", async () => {
    const testClient = await superoak(app)
    await testClient.post("/api/questions/answer")
    .send(JSON.parse('{"questionId": "1", "optionId":"7"}'))
    .expect({correct: "false"})
})

Deno.test("POST request to /api/questions/answer with correct answer option should return JSON {correct:true}", async () => {
    const testClient = await superoak(app)
    await testClient.post("/api/questions/answer")
    .send(JSON.parse('{"questionId": "1", "optionId":"6"}'))
    .expect({correct: "true"})
})

Deno.test("GET request to /api/questions/random responds with a JSON document", async () => {
    const testClient = await superoak(app)
    await testClient.get("/api/questions/random")
    .expect(200)
    .expect("Content-Type", new RegExp("application/json"))
})

Deno.test("GET request to / has status 200", async () => {
    const testClient = await superoak(app)
    await testClient.get("/")
    .expect(200)
})
