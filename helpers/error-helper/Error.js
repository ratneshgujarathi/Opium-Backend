const { HttpStatusCode } = require('./error-constants');

// Define the BaseError class
class BaseError extends Error {
  constructor(name, httpCode, isOperational, description) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.description = description;

    Error.captureStackTrace(this);
  }
}

// Define the APIError class extending BaseError
class APIError extends BaseError {
  constructor(name, description = 'Internal Server Error', httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true) {
    super(name.toUpperCase(), httpCode, isOperational, description);
  }
}

class LogicError extends BaseError {
  constructor(data) {
    super(data.name.toUpperCase(), HttpStatusCode.OK, true, data.description);
  }
}

class ValidationError extends BaseError {
  constructor(data) {
    let description = "Required validation failed on: " + data.map(e => e.field).join(', ');
    super('VALIDATION/MISSING FIELD ERROR', HttpStatusCode.OK, true, description);
  }
}
module.exports = { APIError, ValidationError, LogicError }