import { PrismaMinimal } from "@/plugins/prisma";
import { MatchWithDetails } from "./model";
import { formatDateForGrouping, getMatchDateTime } from "@/utils/date";

export class MatchService {
  async getAll(prisma: PrismaMinimal) {
    // Get today's date range (start and end of today)
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    // Filter condition for today's matches
    const todayFilter = {
      OR: [
        {
          matchDate: {
            gte: startOfToday,
            lt: endOfToday,
          },
        },
        {
          AND: [
            { matchDate: null },
            {
              startTime: {
                gte: startOfToday,
                lt: endOfToday,
              },
            },
          ],
        },
      ],
    };

    const matches = await prisma.match.findMany({
      where: todayFilter,
      include: {
        participantOne: {
          select: {
            name: true,
          },
        },
        participantTwo: {
          select: {
            name: true,
          },
        },
        stage: {
          select: {
            tournament: {
              select: {
                name: true,
                sport: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        results: true,
      },
      orderBy: [{ matchDate: "asc" }, { startTime: "asc" }, { order: "asc" }],
    });

    return matches;
  }
}
