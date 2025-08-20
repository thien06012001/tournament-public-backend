import { Elysia } from "elysia";
import { PrismaClient } from "../generated/prisma"; // or '@prisma/client' if you use default output

// Base client
const prismaBase = new PrismaClient();

// Guard: block ALL write operations anywhere (including inside transactions)
const WRITE_OPS = new Set([
  "create",
  "createMany",
  "update",
  "updateMany",
  "upsert",
  "delete",
  "deleteMany",
  "executeRaw",
  "executeRawUnsafe",
]);

// Extend the client to enforce read-only at the query layer
export const prisma = prismaBase.$extends({
  query: {
    $allModels: {
      $allOperations({ operation, args, query }) {
        if (WRITE_OPS.has(operation as string)) {
          throw new Error("Writes are disabled in this read-only service");
        }
        return query(args);
      },
    },
  },
});

// previously: export type PrismaMinimal = Pick<..., "tournament" | "$transaction">
export type PrismaExtendedClient = typeof prisma;
export type PrismaMinimal = Pick<
  PrismaExtendedClient,
  "tournament" | "match" | "tournamentParticipant" | "$transaction"
>;

export const PrismaPlugin = new Elysia({ name: "plugin.prisma" })
  .decorate("prisma", prisma)
  .onStop(() => prismaBase.$disconnect());
