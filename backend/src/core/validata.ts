import type { RequestHandler } from "express";
import { z } from "zod";

type AnyZodSchema = z.ZodTypeAny; 

type ValidateSchemas = {
  body?: AnyZodSchema;
  query?: AnyZodSchema;
  params?: AnyZodSchema;
  headers?: AnyZodSchema;
};

export function validate(schemas: ValidateSchemas): RequestHandler {
  return (req, _res, next) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body);
      if (schemas.query) (req as any).query = schemas.query.parse(req.query);
      if (schemas.params) (req as any).params = schemas.params.parse(req.params);
      if (schemas.headers) (req as any).headers = schemas.headers.parse(req.headers);
      next();
    } catch (err) {
      next(err);
    }
  };
}