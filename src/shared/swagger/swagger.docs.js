const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const API_BASE_PATH = "/api/v1";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trakify API",
      version: "1.0.0",
      description: "API documentation for the application.",
    },
    servers: [
      {
        url: API_BASE_PATH,
        description: "API Base Path",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/features/**/*.routes.js", "./src/shared/swagger/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
