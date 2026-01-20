import { Response } from "express";
import { ZodError } from "zod";
import { logger } from "../../config/logger.config";
import { StatusCode } from "./errors.constants";

export default function handleServerError(
  res: Response,
  message: string,
  err: unknown
): void {
  if (err instanceof ZodError) {
    const fieldErrors = err.flatten().fieldErrors;
    logger.error({ err }, message);
    res.status(StatusCode.BAD_REQUEST).json({
      message: "Validation failed",
      details: fieldErrors,
    });
    return;
  }

  const statusCode =
    typeof err === "object" && err !== null && "statusCode" in err
      ? (err as any).statusCode
      : StatusCode.INTERNAL_SERVER_ERROR;

  logger.error({ err }, message);

  res.status(statusCode).json({
    message,
  });
}