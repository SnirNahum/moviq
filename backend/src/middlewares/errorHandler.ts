import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../modules/errors/errors.handler";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
}


