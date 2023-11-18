import express from "express";
import {HTTPStatusCode} from "../../helper/status.code.js";
import ApiResponse from "../../helper/api.response.js";
import {authValidation, storeUserValidation} from "../../validation/user.validation.js";
import {validation} from "../../validation/validation.js";
import UserService from "./user.service.js";
import {authMiddleware} from "../../middleware/auth.js";

const userService = new UserService()

const register = async (req, res, next) => {
  try {
    const request = validation(storeUserValidation, req.body)

    const user = await userService.register(request)

    return res.status(HTTPStatusCode.CREATED).json(new ApiResponse.Success(
      HTTPStatusCode.CREATED,
      user,
      "The requested data is successfully created."
    ))
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const request = validation(authValidation, req.body)

    const user = await userService.login(request)

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
      HTTPStatusCode.OK,
      {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        token: user.token
      })
    )
  } catch (err) {
    next(err)
  }
}

const logout = async (req, res, next) => {

  try {
    await userService.logout(req.authUser.id)

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
      HTTPStatusCode.OK,
      null,
      "Logout success."
    ))
  } catch (err) {
    next(err)
  }

}

const show = async (req, res, next) => {

  try {
    const user = await userService.findById(req.authUser.id)

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
      HTTPStatusCode.OK,
      {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      })
    )
  } catch (err) {
    next(err)
  }

}

const update = async (req, res, next) => {

  try {
    let request = validation(storeUserValidation, req.body)

    request.id = req.authUser.id

    await userService.update(request)

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
      HTTPStatusCode.OK,
      null,
      "The requested data is successfully updated."
    ))
  } catch (err) {
    next(err)
  }

}

const router = new express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/profile", authMiddleware, show)
router.put("/profile", authMiddleware, update)
router.post("/logout", authMiddleware, logout)

export default router
