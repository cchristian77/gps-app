import {HTTPStatusCode} from "../helper/status.code.js";
import Errors from "../helper/errors.js";
import ApiResponse from "../helper/api.response.js";

export const errorHandler = (err, req, res, next) => {
  if (!err) {
    next()
    return
  }

  console.log(err.stack)

  if (err instanceof Errors.BaseError) {
    res.status(err.status).json(new ApiResponse.Error(
      err.status,
      err.message,
      err.error
    )).end()
  } else {
    res.status(HTTPStatusCode.INTERNAL_SERVER).json(new ApiResponse.Error(
      HTTPStatusCode.INTERNAL_SERVER,
      "Internal Server Error.",
      err.message
    )).end()
  }
}