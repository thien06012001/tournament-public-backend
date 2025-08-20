import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RankingPlain = t.Object(
  {
    id: t.String(),
    ranking: t.Integer(),
    leaderboardId: t.String(),
    participantId: t.String(),
  },
  { additionalProperties: false },
);

export const RankingRelations = t.Object(
  {
    leaderboard: t.Object(
      { id: t.String(), tournamentId: t.String() },
      { additionalProperties: false },
    ),
    participant: t.Object(
      {
        id: t.String(),
        name: t.String(),
        email: __nullable__(t.String()),
        order: t.Integer(),
        phone: __nullable__(t.String()),
        tournamentId: t.String(),
        stageId: __nullable__(t.String()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const RankingPlainInputCreate = t.Object(
  { ranking: t.Integer() },
  { additionalProperties: false },
);

export const RankingPlainInputUpdate = t.Object(
  { ranking: t.Optional(t.Integer()) },
  { additionalProperties: false },
);

export const RankingRelationsInputCreate = t.Object(
  {
    leaderboard: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    participant: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const RankingRelationsInputUpdate = t.Partial(
  t.Object(
    {
      leaderboard: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      participant: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const RankingWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          ranking: t.Integer(),
          leaderboardId: t.String(),
          participantId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Ranking" },
  ),
);

export const RankingWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), participantId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ participantId: t.String() }),
          ],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              ranking: t.Integer(),
              leaderboardId: t.String(),
              participantId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Ranking" },
);

export const RankingSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      ranking: t.Boolean(),
      leaderboardId: t.Boolean(),
      leaderboard: t.Boolean(),
      participantId: t.Boolean(),
      participant: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const RankingInclude = t.Partial(
  t.Object(
    { leaderboard: t.Boolean(), participant: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const RankingOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ranking: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      leaderboardId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      participantId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Ranking = t.Composite([RankingPlain, RankingRelations], {
  additionalProperties: false,
});

export const RankingInputCreate = t.Composite(
  [RankingPlainInputCreate, RankingRelationsInputCreate],
  { additionalProperties: false },
);

export const RankingInputUpdate = t.Composite(
  [RankingPlainInputUpdate, RankingRelationsInputUpdate],
  { additionalProperties: false },
);
