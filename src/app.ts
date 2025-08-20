import { Elysia } from "elysia";
import { PrismaPlugin } from "./plugins/prisma";
import { CorsPlugin } from "./plugins/cors";
import { SwaggerPlugin } from "./plugins/swagger";
import { SecurityPlugin } from "./plugins/security";
import { ErrorMiddleware } from "./middlewares/error";

import { HealthModule } from "./modules/health";
import { TournamentModule } from "./modules/tournament";
import { SystemModule } from "./modules/system";

export function createApp() {
  return (
    new Elysia()
      // global middleware & plugins
      .use(ErrorMiddleware)
      .use(CorsPlugin)
      .use(SecurityPlugin)
      .use(PrismaPlugin)
      .use(SwaggerPlugin)

      // feature modules
      .use(HealthModule)
      .use(TournamentModule)
      .use(SystemModule)
      // Read-only HTTP guard (allow only GET/OPTIONS)
      .onRequest(({ request, set }) => {
        const method = request.method.toUpperCase();
        if (method === "GET" || method === "OPTIONS") return;
        set.status = 405;
        return { message: "Method Not Allowed: read-only API" };
      })
  );
}
