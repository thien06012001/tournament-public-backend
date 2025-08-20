import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MatchResultPlain = t.Object(
  {
    id: t.String(),
    order: t.Integer(),
    participantOneScore: t.Integer(),
    participantTwoScore: t.Integer(),
    matchId: t.String(),
  },
  { additionalProperties: false },
);

export const MatchResultRelations = t.Object(
  {
    match: t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const MatchResultPlainInputCreate = t.Object(
  {
    order: t.Integer(),
    participantOneScore: t.Integer(),
    participantTwoScore: t.Integer(),
  },
  { additionalProperties: false },
);

export const MatchResultPlainInputUpdate = t.Object(
  {
    order: t.Optional(t.Integer()),
    participantOneScore: t.Optional(t.Integer()),
    participantTwoScore: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const MatchResultRelationsInputCreate = t.Object(
  {
    match: t.Object(
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

export const MatchResultRelationsInputUpdate = t.Partial(
  t.Object(
    {
      match: t.Object(
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

export const MatchResultWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          order: t.Integer(),
          participantOneScore: t.Integer(),
          participantTwoScore: t.Integer(),
          matchId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "MatchResult" },
  ),
);

export const MatchResultWhereUnique = t.Recursive(
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
              order: t.Integer(),
              participantOneScore: t.Integer(),
              participantTwoScore: t.Integer(),
              matchId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "MatchResult" },
);

export const MatchResultSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      order: t.Boolean(),
      participantOneScore: t.Boolean(),
      participantTwoScore: t.Boolean(),
      matchId: t.Boolean(),
      match: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MatchResultInclude = t.Partial(
  t.Object(
    { match: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const MatchResultOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      order: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      participantOneScore: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      participantTwoScore: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      matchId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const MatchResult = t.Composite(
  [MatchResultPlain, MatchResultRelations],
  { additionalProperties: false },
);

export const MatchResultInputCreate = t.Composite(
  [MatchResultPlainInputCreate, MatchResultRelationsInputCreate],
  { additionalProperties: false },
);

export const MatchResultInputUpdate = t.Composite(
  [MatchResultPlainInputUpdate, MatchResultRelationsInputUpdate],
  { additionalProperties: false },
);
