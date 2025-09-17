import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MatchPlain = t.Object(
  {
    id: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    order: t.Integer(),
    ended: t.Boolean(),
    videoId: __nullable__(t.String()),
    matchDate: __nullable__(t.Date()),
    matchTime: __nullable__(t.String()),
    startTime: __nullable__(t.Date()),
    endTime: __nullable__(t.Date()),
    bracket: __nullable__(t.String()),
    winnerId: __nullable__(t.String()),
    participantOneId: __nullable__(t.String()),
    participantTwoId: __nullable__(t.String()),
    stageId: __nullable__(t.String()),
    roundId: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const MatchRelations = t.Object(
  {
    results: t.Array(
      t.Object(
        {
          id: t.String(),
          order: t.Integer(),
          participantOneScore: t.Integer(),
          participantTwoScore: t.Integer(),
          matchId: t.String(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    participantOne: __nullable__(
      t.Object(
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
    ),
    participantTwo: __nullable__(
      t.Object(
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
    ),
    round: __nullable__(
      t.Object(
        {
          id: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          order: t.Integer(),
          stageId: t.String(),
        },
        { additionalProperties: false },
      ),
    ),
    stage: __nullable__(
      t.Object(
        {
          id: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          order: t.Integer(),
          parallelMatches: t.Integer(),
          maxTimePerMatch: t.Number(),
          tournamentId: t.String(),
          type: t.Union(
            [
              t.Literal("SingleElimination"),
              t.Literal("DoubleElimination"),
              t.Literal("Round"),
              t.Literal("Leaderboard"),
            ],
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    winner: __nullable__(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const MatchPlainInputCreate = t.Object(
  {
    order: t.Integer(),
    ended: t.Optional(t.Boolean()),
    matchDate: t.Optional(__nullable__(t.Date())),
    matchTime: t.Optional(__nullable__(t.String())),
    startTime: t.Optional(__nullable__(t.Date())),
    endTime: t.Optional(__nullable__(t.Date())),
    bracket: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const MatchPlainInputUpdate = t.Object(
  {
    order: t.Optional(t.Integer()),
    ended: t.Optional(t.Boolean()),
    matchDate: t.Optional(__nullable__(t.Date())),
    matchTime: t.Optional(__nullable__(t.String())),
    startTime: t.Optional(__nullable__(t.Date())),
    endTime: t.Optional(__nullable__(t.Date())),
    bracket: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const MatchRelationsInputCreate = t.Object(
  {
    results: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    participantOne: t.Optional(
      t.Object(
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
    ),
    participantTwo: t.Optional(
      t.Object(
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
    ),
    round: t.Optional(
      t.Object(
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
    ),
    stage: t.Optional(
      t.Object(
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
    ),
    winner: t.Optional(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const MatchRelationsInputUpdate = t.Partial(
  t.Object(
    {
      results: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
      participantOne: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      participantTwo: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      round: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      stage: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      winner: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const MatchWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          order: t.Integer(),
          ended: t.Boolean(),
          videoId: t.String(),
          matchDate: t.Date(),
          matchTime: t.String(),
          startTime: t.Date(),
          endTime: t.Date(),
          bracket: t.String(),
          winnerId: t.String(),
          participantOneId: t.String(),
          participantTwoId: t.String(),
          stageId: t.String(),
          roundId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Match" },
  ),
);

export const MatchWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
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
              createdAt: t.Date(),
              updatedAt: t.Date(),
              order: t.Integer(),
              ended: t.Boolean(),
              videoId: t.String(),
              matchDate: t.Date(),
              matchTime: t.String(),
              startTime: t.Date(),
              endTime: t.Date(),
              bracket: t.String(),
              winnerId: t.String(),
              participantOneId: t.String(),
              participantTwoId: t.String(),
              stageId: t.String(),
              roundId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Match" },
);

export const MatchSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      order: t.Boolean(),
      ended: t.Boolean(),
      videoId: t.Boolean(),
      matchDate: t.Boolean(),
      matchTime: t.Boolean(),
      startTime: t.Boolean(),
      endTime: t.Boolean(),
      bracket: t.Boolean(),
      winnerId: t.Boolean(),
      participantOneId: t.Boolean(),
      participantTwoId: t.Boolean(),
      stageId: t.Boolean(),
      roundId: t.Boolean(),
      results: t.Boolean(),
      participantOne: t.Boolean(),
      participantTwo: t.Boolean(),
      round: t.Boolean(),
      stage: t.Boolean(),
      winner: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MatchInclude = t.Partial(
  t.Object(
    {
      results: t.Boolean(),
      participantOne: t.Boolean(),
      participantTwo: t.Boolean(),
      round: t.Boolean(),
      stage: t.Boolean(),
      winner: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MatchOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      order: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ended: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      videoId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      matchDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      matchTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      startTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      endTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bracket: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      winnerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      participantOneId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      participantTwoId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      stageId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      roundId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Match = t.Composite([MatchPlain, MatchRelations], {
  additionalProperties: false,
});

export const MatchInputCreate = t.Composite(
  [MatchPlainInputCreate, MatchRelationsInputCreate],
  { additionalProperties: false },
);

export const MatchInputUpdate = t.Composite(
  [MatchPlainInputUpdate, MatchRelationsInputUpdate],
  { additionalProperties: false },
);
