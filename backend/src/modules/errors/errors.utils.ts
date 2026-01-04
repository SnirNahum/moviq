import { DrizzleQueryError } from "drizzle-orm";
import { PG_ERRORS, PgErrorCode } from "./errors.errorCodes";
import { PgDriverError } from "./errors.types";

export function mapPgError(
  err: unknown
): { code: PgErrorCode; message: string } | null {
  if (!(err instanceof DrizzleQueryError)) return null;

  const cause = err.cause;
  if (!cause || typeof cause !== "object") return null;

  const pg = cause as PgDriverError;
  if (!pg.code) return null;

  if (!(pg.code in PG_ERROR_MESSAGE_BY_CODE)) return null;

  const code = pg.code as PgErrorCode;
  const message = PG_ERROR_MESSAGE_BY_CODE[code](pg.detail);

  return { code, message };
}

const PG_ERROR_MESSAGE_BY_CODE: Record<
  PgErrorCode,
  (detail?: string) => string
> = {
  [PG_ERRORS.UNIQUE_VIOLATION.code]: (detail) => cleanUniqueViolation(detail),

  [PG_ERRORS.INVALID_INPUT.code]: () => PG_ERRORS.INVALID_INPUT.defaultMessage,

  [PG_ERRORS.FOREIGN_KEY_VIOLATION.code]: () =>
    PG_ERRORS.FOREIGN_KEY_VIOLATION.defaultMessage,

  [PG_ERRORS.NOT_NULL_VIOLATION.code]: () =>
    PG_ERRORS.NOT_NULL_VIOLATION.defaultMessage,
};

function cleanUniqueViolation(detail?: string): string {
  if (!detail) return PG_ERRORS.UNIQUE_VIOLATION.defaultMessage;

  const match = detail.match(/\(([^)]+)\)=\(([^)]+)\)/);
  if (!match) return PG_ERRORS.UNIQUE_VIOLATION.defaultMessage;

  const field = match[1];
  const value = match[2];

  return `${field} '${value}' already exists`;
}
