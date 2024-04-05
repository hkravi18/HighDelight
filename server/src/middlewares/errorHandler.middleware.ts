import { Response, Request } from "express";
import CustomError from "lib/customError";

const errorHandler = (err: CustomError, req: Request, res: Response) => {
  console.log("err : ", err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "server error";

  console.error(`ERROR (${err.source} | ${err.statusCode}): ${err.message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(`ERROR STACK: ${err.stack}`);
  }

  return res.status(500).json({
    ok: false,
    error: err.message,
    data: {},
  });
};

export default errorHandler;
