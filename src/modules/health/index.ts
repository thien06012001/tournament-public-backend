import { Elysia } from "elysia";

export const HealthModule = new Elysia({
  name: "module.health",
  prefix: "/health",
}).get("/", () => ({ ok: true, ts: Date.now() }), {
  detail: { tags: ["Health"] },
});
