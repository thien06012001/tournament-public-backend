// src/modules/system/index.ts
import { Elysia } from "elysia";
import { PrismaPlugin } from "../../plugins/prisma";
import { SystemService } from "./service";
import { SystemModel } from "./model";

export const SystemModule = new Elysia({
  name: "module.system",
  prefix: "/system",
})
  .use(PrismaPlugin)
  .model({
    "system.overview.response": SystemModel.overviewResponse,
  })
  .get("/overview", async ({ prisma }) => SystemService.overview(prisma), {
    response: { 200: "system.overview.response" },
    detail: {
      tags: ["Tournaments"],
      summary: "System data for home screen (today/tomorrow/ongoing/upcoming)",
    },
  });
