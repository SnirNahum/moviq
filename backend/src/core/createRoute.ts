import type { RequestHandler } from "express";
import { z } from "zod";
import { validate } from "./validata";

export function createPostRoute<TBody>(
  url: string,
  statusCode: number,
  bodySchema: z.ZodTypeAny | undefined,
  buildResponse: (body: TBody) => unknown
) {
  const handlers: RequestHandler[] = [];

  if (bodySchema) handlers.push(validate({ body: bodySchema }));

  handlers.push((req, res) => {
    const body = req.body as TBody;
    return res.status(statusCode).json(buildResponse(body));
  });

  return { url, handlers };
}
