import express from "express";
import {errorHandler} from "../middleware/error.handler.js";
import registerRouters from "./router.js";
import cors from 'cors';

export const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

registerRouters(app)

app.use(errorHandler)