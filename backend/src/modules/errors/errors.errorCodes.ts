export const PG_ERRORS = {
  UNIQUE_VIOLATION: {
    code: "23505",
    defaultMessage: "Duplicate value",
  },
  INVALID_INPUT: {
    code: "22P02",
    defaultMessage: "Invalid input format",
  },
  FOREIGN_KEY_VIOLATION: {
    code: "23503",
    defaultMessage: "Related record does not exist",
  },
  NOT_NULL_VIOLATION: {
    code: "23502",
    defaultMessage: "Missing required field",
  },
} as const;

export type PgErrorCode =
  (typeof PG_ERRORS)[keyof typeof PG_ERRORS]["code"];
