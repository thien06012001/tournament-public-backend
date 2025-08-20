// src/modules/system/model.ts
import { t } from "elysia";

const Score = t.Object({
  a: t.Integer(),
  b: t.Integer(),
});

export namespace SystemModel {
  // Readable “card” for schedule blocks
  export const scheduleMatch = t.Object({
    tournamentName: t.String(),
    teamA: t.String(),
    teamB: t.String(),
    time: t.String(), // "HH:mm"
  });

  export const ongoingMatch = t.Object({
    tournamentName: t.String(),
    teamA: t.String(),
    teamB: t.String(),
    score: Score, // current score (latest result)
    date: t.String(), // ISO date (YYYY-MM-DD)
    time: t.String(), // "HH:mm"
    elapsedMinutes: t.Integer(), // how long it has been (>= 0)
  });

  export const upcomingTournament = t.Object({
    id: t.String(),
    name: t.String(),
    description: t.String(),
    date: t.String(), // "YYYY-MM-DD" (start date)
    location: t.String(),
    type: t.Union([t.Literal("individual"), t.Literal("team")]),
    teamSize: t.Nullable(t.Integer()), // null for individual or unknown
  });

  export const overviewResponse = t.Object({
    today: t.Array(scheduleMatch),
    tomorrow: t.Array(scheduleMatch),
    ongoing: t.Array(ongoingMatch),
    upcomingTournaments: t.Array(upcomingTournament),
  });
}
