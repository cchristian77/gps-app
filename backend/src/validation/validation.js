import {HTTPStatusCode} from "../helper/status.code.js";
import Errors from "../helper/errors.js";

/**
 * Validates the given request object against the provided schema.
 *
 * @param {Joi.Schema} schema - The validation schema.
 * @param {object} request - The request object to be validated.
 * @throws {Errors.BaseError} - Throws an error if the validation fails.
 * @returns {object} - The validated result.
 */
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
