export interface PgErrorDetails {
  code?: string;
  detail?: string;
  constraint?: string;
  table?: string;
  column?: string;
}
