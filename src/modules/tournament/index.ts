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
        summary: "List tournaments with filters and pagination",
      },
    }
  )

  // GET /tournaments/upcoming — list upcoming tournaments
  .get(
    "/upcoming",
    async ({ prisma, query }) => {
      return TournamentService.list(prisma, {
        ...query,
        status: "upcoming",
      } as any);
    },
    {
      query: "tournaments.list.query",
      response: { 200: "tournaments.list.response" },
      detail: {
        tags: ["Tournaments"],
        summary: "List upcoming tournaments with pagination",
      },
    }
  )

  // GET /tournaments/ongoing — list ongoing tournaments
  .get(
    "/ongoing",
    async ({ prisma, query }) => {
      return TournamentService.list(prisma, {
        ...query,
        status: "ongoing",
      } as any);
    },
    {
      query: "tournaments.list.query",
      response: { 200: "tournaments.list.response" },
      detail: {
        tags: ["Tournaments"],
        summary: "List ongoing tournaments with pagination",
      },
    }
  )

  // GET /tournaments/past — list completed tournaments
  .get(
    "/past",
    async ({ prisma, query }) => {
      return TournamentService.list(prisma, {
        ...query,
        status: "completed",
      } as any);
    },
    {
      query: "tournaments.list.query",
      response: { 200: "tournaments.list.response" },
      detail: {
        tags: ["Tournaments"],
        summary: "List completed tournaments with pagination",
      },
    }
  )

  .get(
    "/all",
    async ({ prisma }) => {
      return TournamentService.getAll(prisma);
    },
    {
      response: { 200: "tournaments.all.response" },
      detail: {
        tags: ["Tournaments"],
        summary: "Get all tournaments grouped by status",
      },
    }
  )
  .get(
    "/all/:status",
    async ({ prisma, params: { status }, query: { page, pageSize } }) => {
      return TournamentService.getByStatus(status, page, prisma, pageSize);
    },
    {
      params: t.Object({
        status: t.Enum({
          ongoing: "ongoing",
          upcoming: "upcoming",
          past: "past",
        }),
      }),
      query: t.Object({
        page: t.Integer({ minimum: 1, default: 1 }),
        pageSize: t.Integer({ minimum: 1, maximum: 100, default: 12 }),
      }),
      response: { 200: "tournaments.list.response" },
      detail: {
        tags: ["Tournaments"],
        summary: "Get tournaments by status with pagination",
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
