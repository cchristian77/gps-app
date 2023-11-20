import {HTTPStatusCode} from "./status.code.js";

class BaseError extends Error {
  constructor(status, message, error) {
    super(message);
    this.status = status;
    this.error = error
  }
}

class NotFoundError extends BaseError {
  constructor(message = 'The requested data not found.') {
    super(HTTPStatusCode.NOT_FOUND, message);
  }
}

class InternalServerError extends BaseError {
  constructor(message = 'Internal Server Error.') {
    super(HTTPStatusCode.INTERNAL_SERVER, message);
  }
}

class BadRequestError extends BaseError {
  constructor(message = 'Bad Request.') {
    super(HTTPStatusCode.BAD_REQUEST, message);
  }
}

class InvalidCredentialError extends BaseError {
  constructor(message = 'Login failed. Email or password is incorrect.') {
    super(HTTPStatusCode.BAD_REQUEST, message);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized.') {
    super(HTTPStatusCode.UNAUTHORIZED, message);
  }
}

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
