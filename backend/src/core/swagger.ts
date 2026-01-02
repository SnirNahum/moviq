import type { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export function registerSwagger(app: Express) {
  const spec = swaggerJSDoc({
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Generic Catalog API",
        version: "0.1.0",
        description: "Backend API for Generic Catalog + Admin",
      },
      tags: [
        { name: "Auth", description: "Authentication" },
        { name: "Users", description: "User management" },
        { name: "Catalog", description: "Catalog entities" },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      paths: {
        "/catalog/items": {
          get: {
            tags: ["Catalog"],
            summary: "List catalog items (demo)",
            security: [{ BearerAuth: [] }],
            parameters: [
              {
                name: "q",
                in: "query",
                required: false,
                schema: { type: "string" },
              },
              {
                name: "limit",
                in: "query",
                required: false,
                schema: { type: "integer", minimum: 1, maximum: 100 },
              },
            ],
            responses: {
              "200": {
                description: "OK",
              },
              "400": {
                description: "Validation error",
              },
              "401": {
                description: "Unauthorized",
              },
            },
          },
        },
      },
    },
    apis: [],
  });

  app.get("/docs.json", (_req, res) => res.json(spec));

  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(spec, {
      explorer: true,
      swaggerOptions: { persistAuthorization: true },
    })
  );
}
