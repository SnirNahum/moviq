import express from "express";
import { AppError } from "../../core/errors";

const app = express();

app.get("/__debug/error", async () => {
  throw new AppError({
    statusCode: 418,
    code: "DEBUG_ERROR",
    message: "Global error handler is working",
    details: { note: "remove this route later" },
  });
});
