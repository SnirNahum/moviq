import { response, type ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError, toValidationDetails } from "./errors";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: response.statusCode || 400,
        message: err.message,
        details: toValidationDetails(err),
      },
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
  }

  (req as any).log?.error?.({ err }, "Unhandled error");

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Unexpected error",
    },
  });
};
