import UserRepository from "../domain/user/user.repository.js";
import {HTTPStatusCode} from "../helper/status.code.js";
import ApiResponse from "../helper/api.response.js";
import {verifyToken} from "../helper/token.js";

const userRepository = new UserRepository()
export const authMiddleware = async (req, res, next) => {
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

  next()
}
