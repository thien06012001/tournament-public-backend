import { Elysia, t } from "elysia";
import { PrismaPlugin } from "../../plugins/prisma";
import { MatchService } from "./service";

const matchService = new MatchService();

export const MatchModule = new Elysia({
  name: "module.matches",
  prefix: "/matches",
})
  // Ensure prisma is in the type chain
  .use(PrismaPlugin)
  .model({
    match: t.Object({
      id: t.String(),
      order: t.Number(),
      ended: t.Boolean(),
      videoId: t.Optional(t.String()),
      matchDate: t.Optional(t.String()),
      matchTime: t.Optional(t.String()),
      startTime: t.Optional(t.String()),
      endTime: t.Optional(t.String()),
      bracket: t.Optional(t.String()),
      winnerId: t.Optional(t.String()),
      participantOneId: t.Optional(t.String()),
      participantTwoId: t.Optional(t.String()),
      stageId: t.Optional(t.String()),
      roundId: t.Optional(t.String()),
      createdAt: t.String(),
      updatedAt: t.String(),
    }),
  })
  .get(
    "/",
    async ({ prisma, query }) => {
      const { page, limit } = query;
      return await matchService.getAll(prisma, {
        page: page ? parseInt(page) : undefined,
        limit: limit ? parseInt(limit) : undefined,
      });
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
        limit: t.Optional(t.String()),
      }),
    }
  );
