class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  source: string;

  constructor(errMsg: string, statusCode: number, source: string) {
    super(errMsg);
    this.message = errMsg;
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    this.source = source;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
