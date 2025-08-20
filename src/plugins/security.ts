import { Elysia } from "elysia";

export const SecurityPlugin = new Elysia({ name: "plugin.security" })
  .decorate("requestTime", () => Date.now())
  .decorate("requestId", () => crypto.randomUUID());
