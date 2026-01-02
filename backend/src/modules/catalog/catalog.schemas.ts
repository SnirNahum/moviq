import { z } from "zod";

export const catalogListQuerySchema = z.object({
  q: z.string().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type CatalogListQuery = z.infer<typeof catalogListQuerySchema>;