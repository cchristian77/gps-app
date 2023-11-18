import UserController from "../domain/user/user.controller.js";
// import {authMiddleware} from "../middleware/auth.js";

export default function registerRouters(app) {
  app.get("/ping", (req, res) => {
    return res.send({message: "pong"})
  })

  app.use("/users", UserController)
}