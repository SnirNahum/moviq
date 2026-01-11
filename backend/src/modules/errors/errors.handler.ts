import { Response } from "express";
import { logger } from "../../config/logger.config";

export default function handleServerError(
  res: Response,
  message: string,
  err: unknown
): void {
  logger.error(message);
  res.status(500).json({
    message: message,
    error: err instanceof Error ? err.message : "Unknown error",
  });
}

export class NotFoundError extends Error {
  statusCode = 404;

  constructor(message = "Resource not found") {
    super(message);
  }
}
