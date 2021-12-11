import { Application } from "./deps.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js"
import renderMiddleware from "./middlewares/renderMiddleware.js"
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js"
import { router } from "./routes/routes.js"
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts"
import authMiddleware from "./middlewares/authMiddleware.js"

const session = new Session()
const app = new Application()

app.use(session.initMiddleware())
app.use(authMiddleware)
app.use(errorMiddleware)
app.use(serveStaticMiddleware)
app.use(renderMiddleware)
app.use(router.routes())

export { app };
