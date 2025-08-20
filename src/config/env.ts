import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  CORS_ORIGIN: z.string().default("*"), // set your UI origin(s) in prod: "https://app.example.com,https://admin.example.com"
});

export const env = envSchema.parse(process.env);
