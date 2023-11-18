import {authMiddleware} from "../middleware/auth.js"
import UserController from "../domain/user/user.controller.js"
import GpsController from "../domain/gps/gps.controller.js";

export default function registerRouters(app) {
  app.get("/ping", (req, res) => {
    return res.send({message: "pong"})
  })

  app.use("/users", UserController)
  app.use("/gpses", authMiddleware, GpsController)
}