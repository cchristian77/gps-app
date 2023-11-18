import {HTTPStatusCode} from "../helper/status.code.js";
import Errors from "../helper/errors.js";

export const validation = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  })

  if (result.error) {

    const errors = result.error.details.map(detail => ({
      param: detail.context.label,
      message: detail.message.replace(/['"]/g, '')
    }))
    throw new Errors.BaseError(HTTPStatusCode.BAD_REQUEST, "Input Parameter Invalid", errors)
  } else {
    return result.value;
  }

}
