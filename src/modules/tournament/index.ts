import { Elysia, t } from "elysia";
import { PrismaPlugin } from "../../plugins/prisma";
import { TournamentService } from "./service";
import { TournamentModel } from "./model";

export const TournamentModule = new Elysia({
  name: "module.tournaments",
  prefix: "/tournaments",
})
  // Ensure prisma is in the type chain
  .use(PrismaPlugin)

  // Register models for Swagger + type inference
  .model({
    "tournaments.list.query": TournamentModel.listQuery,
    "tournaments.list.response": TournamentModel.listResponse,
    "tournaments.detail.response": TournamentModel.detailResponse,
    "tournaments.all.response": TournamentModel.listAllResponse,
    "error.default": t.Object({ message: t.String() }),
  })

  // GET /tournaments — list with filters
  .get(
    "/",
    async ({ prisma, query }) => {
      return TournamentService.list(prisma, query as any);
    },
    {
      query: "tournaments.list.query",
      response: { 200: "tournaments.list.response" },
      detail: {
        tags: ["Tournaments"],
        summary: "List tournaments with filters",
      },
    }
  )
  .get(
    "/all",
    async ({ prisma }) => {
      return TournamentService.getAll(prisma);
    },
    {
      detail: {
        tags: ["Tournaments"],
        summary: "List all tournaments with filters",
      },
    }
  )

  // GET /tournaments/:id — detail with relations
  .get(
    "/:id",
    async ({ prisma, params, error }) => {
      const data = await TournamentService.byId(prisma, params.id);
      if (!data) return error(404, { message: "Tournament not found" });
      return data;
    },
    {
      params: t.Object({ id: t.String() }),
      response: {
        200: "tournaments.detail.response",
        404: "error.default",
      },
      detail: {
        tags: ["Tournaments"],
        summary: "Get tournament detail",
      },
    }
  );
