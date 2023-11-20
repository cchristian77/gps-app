import {HTTPStatusCode} from "./status.code.js";

/**
 * Represents a custom base error class that extends the native Error class.
 *
 * @class BaseError
 * @extends Error
 */
class BaseError extends Error {
  constructor(status, message, error) {
    super(message);
    this.status = status;
    this.error = error
  }
}

/**
 * Represents an error thrown when the requested data is not found.
 * @extends BaseError
 */
class NotFoundError extends BaseError {
  constructor(message = 'The requested data not found.') {
    super(HTTPStatusCode.NOT_FOUND, message);
  }
}

/**
 * Represents an internal server error.
 *
 * @class InternalServerError
 * @extends BaseError
 */
class InternalServerError extends BaseError {
  constructor(message = 'Internal Server Error.') {
    super(HTTPStatusCode.INTERNAL_SERVER, message);
  }
}

/**
 * Represents an error that occurs when a bad request is made.
 * @extends {BaseError}
 */
class BadRequestError extends BaseError {
  constructor(message = 'Bad Request.') {
    super(HTTPStatusCode.BAD_REQUEST, message);
  }
}

/**
 * Represents an error that occurs when the login credentials are invalid.
 *
 * @extends BaseError
 */
class InvalidCredentialError extends BaseError {
  constructor(message = 'Login failed. Email or password is incorrect.') {
    super(HTTPStatusCode.BAD_REQUEST, message);
  }
}

/**
 * Represents an unauthorized error.
 * @extends BaseError
 */
class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized.') {
    super(HTTPStatusCode.UNAUTHORIZED, message);
  }
}

/**
 * Represents an error that is thrown when access to a resource is forbidden.
 * @extends {BaseError}
 */
class ForbiddenAccessError extends BaseError {
  constructor(message = 'Forbidden Access.') {
    super(HTTPStatusCode.FORBIDDEN, message);
  }
}

export default {
  BaseError,
  NotFoundError,
  InternalServerError,
  BadRequestError,
  InvalidCredentialError,
  UnauthorizedError,
  ForbiddenAccessError
}
