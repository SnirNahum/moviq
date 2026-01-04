import pino from "pino";

export const logger = pino({
  // level: env.LOG_LEVEL,
  redact: {
    paths: ["req.headers.authorization"],
    remove: true,
  },
});
