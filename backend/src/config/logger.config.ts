import pino from "pino";

export const logger = pino({
  redact: {
    paths: ["req.headers.authorization"],
    remove: true,
  },
});
