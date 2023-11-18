import express from "express";
import {errorHandler} from "../middleware/error.handler.js";
import registerRouters from "./router.js";

export const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

registerRouters(app)

app.use(errorHandler)