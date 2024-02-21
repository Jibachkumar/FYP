class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // override using super
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.message = message;
    this.stack = stack;
    (this.success = false), (this.data = null);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
