import { prisma } from "./../../plugins/prisma";
import type { PrismaMinimal } from "../../plugins/prisma";
import { clampPageSize, buildPageInfo } from "../../utils/pagination";
import { statusFromDates } from "../../utils/date";

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

export class TournamentService {
  static async list(prisma: PrismaMinimal, query: ListQuery) {
    const page = query.page ?? 1;
    const pageSize = clampPageSize(query.pageSize ?? 20);

    const where: any = {
      AND: [
        query.q
          ? { name: { contains: query.q, mode: "insensitive" } }
          : undefined,
        query.sportId ? { sportId: query.sportId } : undefined,
        query.from ? { startDate: { gte: new Date(query.from) } } : undefined,
        query.to ? { endDate: { lte: new Date(query.to) } } : undefined,
      ].filter(Boolean),
    };

    const orderBy = {
      [query.orderBy ?? "createdAt"]: query.order ?? "asc",
    } as const;

    // Keep transaction for atomic count + page read (allowed by our plugin)
    const [total, rows] = await prisma.$transaction([
      prisma.tournament.count({ where }),
      prisma.tournament.findMany({
        where,
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

    const now = new Date();
    let items = rows.map((r) => ({
      ...r,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      status: statusFromDates(now, r.startDate, r.endDate),
    }));

    if (query.status) items = items.filter((i) => i.status === query.status);

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
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            order: true,
          },
        },
        theme: true,
        stages: {
          select: {
            id: true,
            order: true,
            type: true,
            rounds: {
              select: {
                id: true,
                order: true,
                matches: {
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
                    results: {
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
          },
        },
      },
    });

    if (!t) return null;

    const now = new Date();
    const rounds = t.stages.flatMap((s) =>
      s.rounds.map((r) => ({
        id: r.id,
        order: r.order,
        matches: r.matches.map((m) => ({
          ...m,
          matchDate: m.matchDate ? m.matchDate.toISOString() : null,
          startTime: m.startTime ? m.startTime.toISOString() : null,
          endTime: m.endTime ? m.endTime.toISOString() : null,
        })),
      }))
    );

    return {
      id: t.id,
      name: t.name,
      location: t.location,
      type: t.type,
      description: t.description,
      startDate: t.startDate.toISOString(),
      endDate: t.endDate.toISOString(),
      banner: t.banner,
      background: t.background,
      thumbnail: t.thumbnail,
      sportId: t.sportId,
      status: statusFromDates(now, t.startDate, t.endDate),
      participants: t.participants,
      stages: t.stages.map((s) => ({ id: s.id, order: s.order, type: s.type })),
      rounds,
    };
  }

  static async getAll(prisma: PrismaMinimal) {
    const [ongoing, upcoming, past] = await Promise.all([
      prisma.tournament.findMany({
        where: {
          startDate: {
            lte: new Date(),
          },
          endDate: {
            gte: new Date(),
          },
        },
      }),
      prisma.tournament.findMany({
        where: {
          startDate: {
            gt: new Date(),
          },
          endDate: {
            gt: new Date(),
          },
        },
      }),
      prisma.tournament.findMany({
        where: {
          startDate: {
            lt: new Date(),
          },
          endDate: {
            lt: new Date(),
          },
        },
      }),
    ]);

    return { ongoing, upcoming, past };
  }
}
