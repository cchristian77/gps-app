import UserRepository from "../domain/user/user.repository.js";
import {HTTPStatusCode} from "../helper/status.code.js";
import ApiResponse from "../helper/api.response.js";
import {verifyToken} from "../helper/token.js";

const userRepository = new UserRepository()
const authentication = (roles) => {
  return async (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization === null) {
      return res.status(HTTPStatusCode.UNAUTHORIZED).json(
        new ApiResponse.Error(HTTPStatusCode.UNAUTHORIZED, "Unauthorized.")
      )
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(HTTPStatusCode.UNAUTHORIZED).json(
        new ApiResponse.Error(HTTPStatusCode.UNAUTHORIZED, "Unauthorized.")
      )
    }

    const user = await userRepository.findByToken(token)
    if (!user) {
      return res.status(HTTPStatusCode.UNAUTHORIZED).json(
        new ApiResponse.Error(HTTPStatusCode.UNAUTHORIZED, "Invalid Token.")
      )
    }

    try {
      const payload = verifyToken(token)
      req.authUser = user
    } catch (err) {
      new ApiResponse.Error(HTTPStatusCode.UNAUTHORIZED, "Invalid Token.")
    }

    if (roles.includes(user.role)) {
      return next()
    }

    return res.status(HTTPStatusCode.FORBIDDEN).json(
      new ApiResponse.Error(HTTPStatusCode.FORBIDDEN, "Forbidden.")
    )
  }
}

export const userMiddleware = authentication(["USER"])

export const adminMiddleware = authentication(["ADMINISTRATOR"])

export const authMiddleware = authentication(["USER", "ADMINISTRATOR"])



