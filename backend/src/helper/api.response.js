import {HTTPStatusCode} from "./status.code.js";

class Success {
  constructor(status, data, message = "Success") {
    this.status = status
    this.message = message
    this.data = data
  }
}

class DataPagination extends Success {
  constructor(data, meta) {
    super(HTTPStatusCode.OK, data)
    this.meta= meta
  }

}

class Error {
  constructor(status, message, errors) {
    this.status = status;
    this.message = message
    this.errors = errors
  }
}

export default { Success, DataPagination, Error }