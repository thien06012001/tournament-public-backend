// src/middlewares/error.ts
import { Elysia } from "elysia";

function statusFromCode(code: string | number): number {
  if (typeof code === "number") return code; // Elysia sometimes provides numeric HTTP code
  switch (code) {
    case "NOT_FOUND":
      return 404;
    case "VALIDATION":
    case "PARSE":
    case "INVALID_COOKIE_SIGNATURE":
    case "INVALID_FILE_TYPE":
      return 400;
    case "INTERNAL_SERVER_ERROR":
      return 500;
    default:
      return 500;
  }
}

function extractErrorMessage(err: unknown, code: string | number): string {
  const codeStr = String(code);

  if (codeStr === "VALIDATION") {
    const ve = err as { errors?: Array<{ message?: string }> };
    if (Array.isArray(ve?.errors) && ve.errors[0]?.message)
      return `Validation error: ${ve.errors[0].message}`;
    return "Validation error";
  }

  if (typeof err === "string") return err;

  if (err && typeof err === "object") {
    const anyErr = err as {
      message?: unknown;
      cause?: unknown;
      toString?: () => string;
    };
    if (typeof anyErr.message === "string") return anyErr.message;
    if (typeof anyErr.cause === "string") return anyErr.cause;
    const s = anyErr.toString?.();
    if (typeof s === "string" && s !== "[object Object]") return s;
  }

  return "Internal server error";
}

export const ErrorMiddleware = new Elysia({ name: "middleware.error" }).onError(
  ({ code, error, set }) => {
    set.status = statusFromCode(code);
    return { message: extractErrorMessage(error, code), code };
  }
);
