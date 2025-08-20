import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

export const SwaggerPlugin = new Elysia({ name: "plugin.swagger" }).use(
  swagger({
    path: "/docs",
    documentation: {
      info: {
        title: "Tournament Read API",
        version: "1.0.0",
        description:
          "Read-only endpoints exposing tournament data and relations",
      },
      tags: [
        { name: "Health", description: "Health checks" },
        { name: "Tournaments", description: "Tournament data (read-only)" },
      ],
    },
  })
);
