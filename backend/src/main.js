import {app} from "./api/server.js"
import {config} from "dotenv";

config()
app.listen(process.env.APP_PORT, () => {
    console.log(`Starting service on port ${process.env.APP_PORT}`)
})
