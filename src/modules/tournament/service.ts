import { prisma, type PrismaMinimal } from "../../plugins/prisma";
import { clampPageSize, buildPageInfo } from "../../utils/pagination";
import { statusFromDates } from "../../utils/date";
import { t } from "elysia";

type ListQuery = {
  q?: string;
  sportId?: string;
  status?: "upcoming" | "ongoing" | "completed";
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  orderBy?: "createdAt" | "startDate" | "endDate";
  order?: "asc" | "desc";
};

export const getTournamentsByStatusSchema = t.Object({
  status: t.Enum({
    ongoing: "ongoing",
    upcoming: "upcoming",
    past: "past",
  }),
  page: t.Number(),
});

type GetTournamentsByStatusRequest = typeof getTournamentsByStatusSchema.static;

export class TournamentService {
  static async list(prisma: PrismaMinimal, query: ListQuery) {
    const page = query.page ?? 1;
    const pageSize = clampPageSize(query.pageSize ?? 20);
    const now = new Date();

    // Build base where condition
    const baseWhere: any = {
      AND: [
        query.q
          ? { name: { contains: query.q, mode: "insensitive" } }
          : undefined,
        query.sportId ? { sportId: query.sportId } : undefined,
        query.from ? { startDate: { gte: new Date(query.from) } } : undefined,
        query.to ? { endDate: { lte: new Date(query.to) } } : undefined,
      ].filter(Boolean),
    };

    // Add status filtering to WHERE clause to fix pagination
    if (query.status) {
      switch (query.status) {
        case "upcoming":
          baseWhere.AND.push({ startDate: { gt: now } });
          break;
        case "ongoing":
          baseWhere.AND.push(
            { startDate: { lte: now } },
            { endDate: { gte: now } }
          );
          break;
        case "completed":
          baseWhere.AND.push({ endDate: { lt: now } });
          break;
      }
    }

    const orderBy = {
      [query.orderBy ?? "createdAt"]: query.order ?? "asc",
    } as const;

    // Keep transaction for atomic count + page read (allowed by our plugin)
    const [total, rows] = await prisma.$transaction([
      prisma.tournament.count({ where: baseWhere }),
      prisma.tournament.findMany({
        where: baseWhere,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          location: true,
          type: true,
          description: true,
          startDate: true,
          endDate: true,
          banner: true,
          background: true,
          thumbnail: true,
          sportId: true,
        },
      }),
    ]);

    const items = rows.map((r) => ({
      ...r,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      status: statusFromDates(now, r.startDate, r.endDate),
    }));

    return { items, pageInfo: buildPageInfo(total, page, pageSize) };
  }

  static async byId(prisma: PrismaMinimal, id: string) {
    const t = await prisma.tournament.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        location: true,
        type: true,
        description: true,
        startDate: true,
        endDate: true,
        banner: true,
        background: true,
        thumbnail: true,
        sportId: true,
        theme: true,
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            order: true,
          },
          orderBy: { order: "asc" },
        },
        stages: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            order: true,
            type: true,
            // For Round stages
            rounds: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                order: true,
                matches: {
                  orderBy: { order: "asc" },
                  select: {
                    id: true,
                    order: true,
                    ended: true,
                    matchDate: true,
                    matchTime: true,
                    startTime: true,
                    endTime: true,
                    bracket: true,
                    winnerId: true,
                    participantOneId: true,
                    participantTwoId: true,
                    participantOne: true,
                    participantTwo: true,
                    results: {
                      orderBy: { order: "asc" },
                      select: {
                        id: true,
                        order: true,
                        participantOneScore: true,
                        participantTwoScore: true,
                      },
                    },
                  },
                },
              },
            },
            // For Single/Double Elimination stages (no rounds)
            matches: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                order: true,
                ended: true,
                matchDate: true,
                matchTime: true,
                startTime: true,
                endTime: true,
                bracket: true,
                winnerId: true,
                participantOneId: true,
                participantTwoId: true,
                participantOne: true,
                participantTwo: true,
                results: {
                  orderBy: { order: "asc" },
                  select: {
                    id: true,
                    order: true,
                    participantOneScore: true,
                    participantTwoScore: true,
                  },
                },
              },
            },
          },
        },
        leaderboard: {
          select: {
            id: true,
            rankings: {
              orderBy: { ranking: "asc" },
              select: {
                id: true,
                ranking: true,
                result: true,
                participantId: true,
              },
            },
          },
        },
      },
    });

    if (!t) return null;

    const now = new Date();

    const serializeMatch = <
      T extends {
        matchDate: Date | null;
        startTime: Date | null;
        endTime: Date | null;
      },
    >(
      m: T
    ) => ({
      ...m,
      matchDate: m.matchDate ? m.matchDate.toISOString() : null,
      startTime: m.startTime ? m.startTime.toISOString() : null,
      endTime: m.endTime ? m.endTime.toISOString() : null,
    });

    // inside TournamentService.byId(...)
    const stages = t.stages.map((s) => {
      if (s.type === "Round") {
        return {
          id: s.id,
          order: s.order,
          type: s.type,
          rounds: (s.rounds ?? []).map((r) => ({
            id: r.id,
            order: r.order,
            matches: (r.matches ?? []).map(serializeMatch),
          })),
        };
      }

      // SingleElimination / DoubleElimination: matches live directly on the stage
      const matches = (s.matches ?? []).map(serializeMatch);

      if (s.type === "DoubleElimination") {
        // ⚠️ backend uses "winner" / "loser"
        const winBracketMatches = matches.filter((m) => m.bracket === "winner");
        const loseBracketMatches = matches.filter((m) => m.bracket === "loser");

        return {
          id: s.id,
          order: s.order,
          type: s.type,
          matches, // keep all matches
          winBracketMatches, // NEW
          loseBracketMatches, // NEW
        };
      }

      // SingleElimination
      return {
        id: s.id,
        order: s.order,
        type: s.type,
        matches,
      };
    });

    return {
      id: t.id,
      name: t.name,
      location: t.location,
      type: t.type,
      description: t.description,
      startDate: t.startDate?.toISOString(),
      endDate: t.endDate?.toISOString(),
      banner: t.banner,
      background: t.background,
      thumbnail: t.thumbnail,
      sportId: t.sportId,
      status: statusFromDates(now, t.startDate, t.endDate),
      participants: t.participants, // already ordered
      stages, // ← union shape per stage.type
      theme: t.theme,
      leaderboard: t.leaderboard,
    };
  }

  static async getAll(prisma: PrismaMinimal) {
    const now = new Date();

    const [ongoingRows, upcomingRows, pastRows] = await Promise.all([
      prisma.tournament.findMany({
        where: {
          startDate: {
            lte: now,
          },
          endDate: {
            gte: now,
          },
        },
        select: {
          id: true,
          name: true,
          location: true,
          type: true,
          description: true,
          startDate: true,
          endDate: true,
          banner: true,
          background: true,
          thumbnail: true,
          sportId: true,
        },
        take: 3,
        orderBy: { startDate: "asc" },
      }),
      prisma.tournament.findMany({
        where: {
          startDate: {
            gt: now,
          },
          endDate: {
            gt: now,
          },
        },
        select: {
          id: true,
          name: true,
          location: true,
          type: true,
          description: true,
          startDate: true,
          endDate: true,
          banner: true,
          background: true,
          thumbnail: true,
          sportId: true,
        },
        take: 3,
        orderBy: { startDate: "asc" },
      }),
      prisma.tournament.findMany({
        where: {
          startDate: {
            lt: now,
          },
          endDate: {
            lt: now,
          },
        },
        select: {
          id: true,
          name: true,
          location: true,
          type: true,
          description: true,
          startDate: true,
          endDate: true,
          banner: true,
          background: true,
          thumbnail: true,
          sportId: true,
        },
        take: 3,
        orderBy: { startDate: "desc" },
      }),
    ]);

    const ongoing = ongoingRows.map((r) => ({
      ...r,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
    }));

    const upcoming = upcomingRows.map((r) => ({
      ...r,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
    }));

    const past = pastRows.map((r) => ({
      ...r,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
    }));

    return { ongoing, upcoming, past };
  }

  static async getByStatus(
    status: "ongoing" | "upcoming" | "past",
    page: number,
    prisma: PrismaMinimal,
    pageSize: number = 12
  ) {
    const select = {
      id: true,
      name: true,
      location: true,
      type: true,
      description: true,
      startDate: true,
      endDate: true,
      banner: true,
      background: true,
      thumbnail: true,
      sportId: true,
    };

    const now = new Date();
    const take = clampPageSize(pageSize);
    const skip = (page - 1) * take;

    let whereClause;
    let orderBy;

    switch (status) {
      case "ongoing":
        whereClause = {
          startDate: { lte: now },
          endDate: { gte: now },
        };
        orderBy = { startDate: "asc" };
        break;
      case "upcoming":
        whereClause = {
          startDate: { gt: now },
        };
        orderBy = { startDate: "asc" };
        break;
      case "past":
        whereClause = {
          endDate: { lt: now },
        };
        orderBy = { startDate: "desc" };
        break;
      default:
        return { items: [], pageInfo: buildPageInfo(0, page, take) };
    }

    // Get total count and tournaments in parallel
    const [total, tournaments] = await Promise.all([
      prisma.tournament.count({ where: whereClause }),
      prisma.tournament.findMany({
        where: whereClause,
        select,
        take,
        skip,
        orderBy: orderBy as any,
      }),
    ]);

    const items = tournaments.map((t) => ({
      ...t,
      startDate: t.startDate.toISOString(),
      endDate: t.endDate.toISOString(),
      status: status === "past" ? "completed" : status,
    })) as any;

    return { items, pageInfo: buildPageInfo(total, page, take) };
  }
}
