import fs from "fs";
import path from "path";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

export function setupSwagger(app: Express) {
  const specPath = path.join(process.cwd(), "swagger.yaml");
  const file = fs.readFileSync(specPath, "utf8");
  const openapiDocument = YAML.parse(file);

  // Raw spec
  app.get("/docs.json", (_req, res) => {
    res.json(openapiDocument);
  });

  // Swagger UI
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));
}
