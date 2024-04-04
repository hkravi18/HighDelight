import { Response, Request, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  console.log(`[${formattedTime}] ${req.method} ${req.originalUrl}`);
  next();
};

export default logger;
