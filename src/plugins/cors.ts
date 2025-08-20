import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { env } from "../config/env";

export const CorsPlugin = new Elysia({ name: "plugin.cors" }).use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((s) => s.trim()),
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET"],
  })
);
