import type { RequestHandler } from "express";
import type { CatalogListQuery } from "./catalog.schemas";

export const listCatalogItemsHandler: RequestHandler = (req, res) => {
  const { q, limit } = req.query as CatalogListQuery;

  res.status(200).json({
    items: [],
    q: q ?? null,
    limit: limit ?? null,
  });
};