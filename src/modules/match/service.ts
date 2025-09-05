import { PrismaMinimal } from "@/plugins/prisma";
import { MatchWithDetails } from "./model";
import { formatDateForGrouping, getMatchDateTime } from "@/utils/date";

export class MatchService {
  async getAll(
    prisma: PrismaMinimal,
    options?: {
      page?: number;
      limit?: number;
    }
  ) {
    const { page = 1, limit = 10 } = options || {};
    const skip = (page - 1) * limit;

    // Get total count for pagination info
    const total = await prisma.match.count();

    const matches = await prisma.match.findMany({
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
      orderBy: [{ matchDate: "desc" }, { startTime: "desc" }, { order: "asc" }],
      skip,
      take: limit,
    });

    const groupedMatches = new Map<string, MatchWithDetails[]>();

    matches.forEach((match) => {
      // Use utility function to get the appropriate date
      const matchDateTime = getMatchDateTime(match);
      const groupDate = formatDateForGrouping(matchDateTime);

      if (!groupedMatches.has(groupDate)) {
        groupedMatches.set(groupDate, []);
      }

      groupedMatches.get(groupDate)!.push(match);
    });

    // Convert Map to array of objects for easier consumption
    const result = Array.from(groupedMatches.entries())
      .map(([date, matches]) => ({
        date,
        matches: matches.sort((a, b) => {
          // Sort matches within each date by time (latest first)
          const timeA = getMatchDateTime(a);
          const timeB = getMatchDateTime(b);
          return timeB.getTime() - timeA.getTime();
        }),
      }))
      .sort((a, b) => b.date.localeCompare(a.date));

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return {
      data: result,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore,
        hasPrev: page > 1,
      },
    };
  }
}
