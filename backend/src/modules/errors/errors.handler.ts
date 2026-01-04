import type { Response } from "express";
import { mapPgError } from "./errors.utils";

export default function serverError(
  res: Response,
  message: string,
  err: unknown
): void {
  const mapped = mapPgError(err);

  if (mapped) {
    res.status(400).json({
      message: mapped.message,
      code: mapped.code,
    });
    return;
  }

  res.status(500).json({
    message,
    error: err instanceof Error ? err.message : "Unknown error",
  });
}