import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import handleServerError from "../modules/errors/errors.handler";

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync(req.body);
      (req as any).body = parsed;
      next();
    } catch (err: any) {
      handleServerError(res, err?.message, err);
    }
  };
};