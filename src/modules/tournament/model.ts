// src/modules/tournament/model.ts
import { t } from "elysia";

/**
 * Enums / literals
 */
const Status = t.Union([
  t.Literal("upcoming"),
  t.Literal("ongoing"),
  t.Literal("completed"),
  t.Literal("unknown"),
]);

const TournamentType = t.Union([t.Literal("individual"), t.Literal("team")]);

const OrderBy = t.Union([
  t.Literal("createdAt"),
  t.Literal("startDate"),
  t.Literal("endDate"),
]);

const Order = t.Union([t.Literal("asc"), t.Literal("desc")]);

/**
 * Public models for the Tournament module
 * (Register these names in your controller with .model({...}))
 */
export namespace TournamentModel {
  /**
   * GET /tournaments query params (ergonomic filters)
   */
  export const listQuery = t.Object({
    q: t.Optional(t.String()),
    sportId: t.Optional(t.String()),
    status: t.Optional(
      t.Union([
        t.Literal("upcoming"),
        t.Literal("ongoing"),
        t.Literal("completed"),
      ])
    ),
    from: t.Optional(t.String({ format: "date" })), // startDate >= from
    to: t.Optional(t.String({ format: "date" })), // endDate   <= to
    page: t.Optional(t.Integer({ minimum: 1 })),
    pageSize: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    orderBy: t.Optional(OrderBy),
    order: t.Optional(Order),
  });

  /**
   * List item shape (exactly what the service returns)
   * Dates are ISO strings and we add a computed `status`.
   */
  export const listItem = t.Object({
    id: t.String(),
    name: t.String(),
    location: t.String(),
    type: TournamentType,
    description: t.String(),
    startDate: t.String(), // ISO string
    endDate: t.String(), // ISO string
    banner: t.Nullable(t.String()),
    background: t.Nullable(t.String()),
    thumbnail: t.Nullable(t.String()),
    sportId: t.Nullable(t.String()),
  });

  export const pageInfo = t.Object({
    total: t.Integer(),
    page: t.Integer(),
    pageSize: t.Integer(),
    totalPages: t.Integer(),
    hasNext: t.Boolean(),
    hasPrev: t.Boolean(),
  });

  export const listResponse = t.Object({
    items: t.Array(listItem),
    pageInfo,
  });

  export const listAllResponse = t.Object({
    ongoing: t.Array(listItem),
    upcoming: t.Array(listItem),
    past: t.Array(listItem),
  });

  /**
   * Detail response parts
   */
  const participant = t.Object({
    id: t.String(),
    name: t.String(),
    email: t.Nullable(t.String()),
    order: t.Integer(),
    phone: t.Nullable(t.String()),
  });

  const matchResult = t.Object({
    id: t.String(),
    order: t.Integer(),
    participantOneScore: t.Integer(),
    participantTwoScore: t.Integer(),
  });

  const match = t.Object({
    id: t.String(),
    order: t.Integer(),
    ended: t.Boolean(),
    matchDate: t.Nullable(t.String()), // ISO string
    matchTime: t.Nullable(t.String()),
    startTime: t.Nullable(t.String()), // ISO string
    endTime: t.Nullable(t.String()), // ISO string
    bracket: t.Nullable(t.String()),
    winnerId: t.Nullable(t.String()),
    participantOneId: t.Nullable(t.String()),
    participantTwoId: t.Nullable(t.String()),
    results: t.Array(matchResult),
  });

  const round = t.Object({
    id: t.String(),
    order: t.Integer(),
    matches: t.Array(match),
  });

  const stage = t.Object({
    id: t.String(),
    order: t.Integer(),
    type: t.Union([
      t.Literal("SingleElimination"),
      t.Literal("DoubleElimination"),
      t.Literal("Round"),
      t.Literal("Leaderboard"),
    ]),
  });

  /**
   * GET /tournaments/:id response (exactly what the service returns)
   */
  export const detailResponse = t.Object({
    id: t.String(),
    name: t.String(),
    location: t.String(),
    type: TournamentType,
    description: t.String(),
    startDate: t.String(), // ISO
    endDate: t.String(), // ISO
    banner: t.Nullable(t.String()),
    background: t.Nullable(t.String()),
    thumbnail: t.Nullable(t.String()),
    sportId: t.Nullable(t.String()),
    status: Status,
    participants: t.Array(participant),
    stages: t.Array(stage),
    rounds: t.Array(round),
    theme: t.Nullable(t.String()),
    leaderboard: t.Optional(t.Any()), // Flexible structure, handled in frontend
  });
}
