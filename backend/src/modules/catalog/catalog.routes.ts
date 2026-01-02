import { Router } from "express";
import { catalogListQuerySchema } from "./catalog.schemas";
import { listCatalogItemsHandler } from "./catalog.handlers";
import { validate } from "../../core/validata";

const catalogRouter = Router();

catalogRouter.get(
  "/items",
  validate({ query: catalogListQuerySchema }),
  listCatalogItemsHandler
);

export default catalogRouter;
