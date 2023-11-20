import express from "express";
import {HTTPStatusCode} from "../../helper/status.code.js";
import ApiResponse from "../../helper/api.response.js";
import {authValidation, storeUserValidation} from "../../validation/user.validation.js";
import {validation} from "../../validation/validation.js";
import UserService from "./user.service.js";
import {authMiddleware} from "../../middleware/auth.js";
import {getLoginResponseDTO, getUserDetailResponse} from "../../dto/user.dto.js";

const userService = new UserService()

/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 *
 * @returns {object} - The HTTP response object.
 *
 * @throws {Error} - If an error occurs during the registration process.
 */
const register = async (req, res, next) => {
  try {
    const request = validation(storeUserValidation, req.body)

    const user = await userService.register(request)

    return res.status(HTTPStatusCode.CREATED).json(new ApiResponse.Success(
      HTTPStatusCode.CREATED,
      getUserDetailResponse(user),
      "The requested data is successfully created."
    ))
  } catch (err) {
    next(err)
  }
}

/**
 * User login request
 *
 * @async
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 *
 * @returns {object} - The HTTP response object.
 *
 * @throws {Error} If an error occurs during the login process
 */
const login = async (req, res, next) => {
  try {
    const request = validation(authValidation, req.body)

    const user = await userService.login(request)

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
      HTTPStatusCode.OK,
      getLoginResponseDTO(user))
    )
  } catch (err) {
    next(err)
  }
}

/**
 * Logs out the authenticated user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {object} - The HTTP response object.
 *
 * @throws {Error} - If there is an error during the logout process.
 */
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

/**
 * shows the user details.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {object} - The HTTP response object.
 *
 * @throws {Error} - If there is an error while retrieving the user details.
 */
const show = async (req, res, next) => {

  try {
    const user = await userService.findById(req.authUser.id)

    return res.status(HTTPStatusCode.OK).json(new ApiResponse.Success(
        HTTPStatusCode.OK,
        getUserDetailResponse((user))
      )
    )
  } catch (err) {
    next(err)
  }

}

/**
 * Updates the user data.
 *
 * @async
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next function.
 *
 * @returns {object} - The HTTP response object.
 *
 * @throws {Error} - If an error occurs while updating the user data.
 */
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

/**
 * a router instance
 *
 * @memberof express
 */
const router = new express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/profile", authMiddleware, show)
router.put("/profile", authMiddleware, update)
router.post("/logout", authMiddleware, logout)

export default router
