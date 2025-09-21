// src/modules/system/service.ts
import type { PrismaMinimal } from "../../plugins/prisma";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function toHHmm(d?: Date | null) {
  if (!d) return "--:--";
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function toISODate(d: Date) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

/** Returns positive minutes between two dates (to - from), clamped at 0 */
function minutesBetween(from: Date, to: Date) {
  return Math.max(0, Math.floor((to.getTime() - from.getTime()) / 60000));
}

/** Format a minutes count as HH:MM (e.g., 0 -> 00:00, 75 -> 01:15) */
function minutesToHHMM(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function tournamentNameOf(row: {
  stage?: { tournament?: { name: string } | null } | null;
  participantOne?: { tournament?: { name: string } | null } | null;
  participantTwo?: { tournament?: { name: string } | null } | null;
}) {
  return (
    row.stage?.tournament?.name ??
    row.participantOne?.tournament?.name ??
    row.participantTwo?.tournament?.name ??
    "Unknown Tournament"
  );
}

export class SystemService {
  static async overview(prisma: PrismaMinimal) {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const tomorrowStart = startOfDay(addDays(now, 1));
    const tomorrowEnd = endOfDay(addDays(now, 1));

    async function getMatchesInRange(from: Date, to: Date) {
      const [withStart, withDateNoStart] = await prisma.$transaction([
        prisma.match.findMany({
          where: { startTime: { gte: from, lte: to } },
          select: {
            startTime: true,
            matchDate: true,
            participantOne: {
              select: { name: true, tournament: { select: { name: true } } },
            },
            participantTwo: {
              select: { name: true, tournament: { select: { name: true } } },
            },
            stage: { select: { tournament: { select: { name: true } } } },
          },
          orderBy: { startTime: "asc" },
        }),
        prisma.match.findMany({
          where: { startTime: null, matchDate: { gte: from, lte: to } },
          select: {
            startTime: true,
            matchDate: true,
            participantOne: {
              select: { name: true, tournament: { select: { name: true } } },
            },
            participantTwo: {
              select: { name: true, tournament: { select: { name: true } } },
            },
            stage: { select: { tournament: { select: { name: true } } } },
          },
          orderBy: { matchDate: "asc" },
        }),
      ]);

      const rows = [...withStart, ...withDateNoStart];
      return rows.map((m) => {
        const tName = tournamentNameOf(m);
        const displayTime = toHHmm(m.startTime ?? m.matchDate);
        return {
          tournamentName: tName,
          teamA: m.participantOne?.name ?? "TBD",
          teamB: m.participantTwo?.name ?? "TBD",
          time: displayTime,
        };
      });
    }

    // Today & Tomorrow
    const [today, tomorrow] = await Promise.all([
      getMatchesInRange(todayStart, todayEnd),
      getMatchesInRange(tomorrowStart, tomorrowEnd),
    ]);

    // Ongoing (NOTE: your comment said "started, not ended" but the filter had future matches)
    // If you truly want started-but-not-ended, use startTime <= now and ended = false.
    // If you want upcoming today, keep startTime > now. Below keeps UPCOMING TODAY (soonest first).
    const ongoingRows = await prisma.match.findMany({
      where: {
        ended: false,
        matchDate: { gte: todayStart, lte: todayEnd },
        startTime: { gt: now }, // upcoming today (not yet started)
      },
      select: {
        startTime: true,
        endTime: true,
        matchDate: true,
        participantOne: {
          select: { name: true, tournament: { select: { name: true } } },
        },
        participantTwo: {
          select: { name: true, tournament: { select: { name: true } } },
        },
        stage: { select: { tournament: { select: { name: true } } } },
        results: {
          select: {
            order: true,
            participantOneScore: true,
            participantTwoScore: true,
          },
          orderBy: { order: "desc" },
          take: 1,
        },
      },
      orderBy: [{ startTime: "asc" }],
      take: 20,
    });

    const ongoing = ongoingRows.map((m) => {
      const tName = tournamentNameOf(m);
      const startsAt = m.startTime!; // guaranteed by filter above
      const score = m.results[0]
        ? {
            a: m.results[0].participantOneScore,
            b: m.results[0].participantTwoScore,
          }
        : { a: 0, b: 0 };

      // Time UNTIL kickoff in HH:MM (was minutes, reversed order before)
      const minsUntil = minutesBetween(now, startsAt); // <-- correct direction
      const hhmmUntil = minutesToHHMM(minsUntil);

      return {
        tournamentName: tName,
        teamA: m.participantOne?.name ?? "TBD",
        teamB: m.participantTwo?.name ?? "TBD",
        score,
        date: toISODate(startsAt),
        time: toHHmm(startsAt),
        // previously a number; now HH:MM as requested
        elapsedMinutes: hhmmUntil,
      };
    });

    // Upcoming tournaments (next 30 days by default)
    const upcomingRows = await prisma.tournament.findMany({
      where: { startDate: { gte: todayStart } },
      orderBy: { startDate: "asc" },
      take: 10,
      select: {
        id: true,
        name: true,
        description: true,
        startDate: true,
        location: true,
        type: true,
        thumbnail: true,
      },
    });

    const teamTypeIds = upcomingRows
      .filter((t) => t.type === "team")
      .map((t) => t.id);
    let teamSizes: Record<string, number | null> = {};
    if (teamTypeIds.length) {
      const participants = await prisma.tournamentParticipant.findMany({
        where: { tournamentId: { in: teamTypeIds } },
        select: { tournamentId: true, _count: { select: { members: true } } },
      });

      const map = new Map<string, number[]>();
      for (const p of participants) {
        const arr = map.get(p.tournamentId) ?? [];
        arr.push(p._count.members);
        map.set(p.tournamentId, arr);
      }
      for (const [tid, counts] of map) {
        if (!counts.length) {
          teamSizes[tid] = null;
          continue;
        }
        const freq = new Map<number, number>();
        for (const c of counts) freq.set(c, (freq.get(c) ?? 0) + 1);
        let best = counts[0];
        let bestN = 0;
        for (const [val, n] of freq) {
          if (n > bestN) {
            best = val;
            bestN = n;
          }
        }
        teamSizes[tid] = best;
      }
    }

    const upcomingTournaments = upcomingRows.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      date: toISODate(t.startDate),
      location: t.location,
      type: t.type,
      teamSize: t.type === "team" ? (teamSizes[t.id] ?? null) : null,
      thumbnail: t.thumbnail,
    }));

    return { today, tomorrow, ongoing, upcomingTournaments };
  }
}
