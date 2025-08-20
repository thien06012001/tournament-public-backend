import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RoundPlain = t.Object(
  {
    id: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    order: t.Integer(),
    stageId: t.String(),
  },
  { additionalProperties: false },
);

export const RoundRelations = t.Object(
  {
    stage: t.Object(
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
    matches: t.Array(
      t.Object(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const RoundPlainInputCreate = t.Object(
  { order: t.Integer() },
  { additionalProperties: false },
);

export const RoundPlainInputUpdate = t.Object(
  { order: t.Optional(t.Integer()) },
  { additionalProperties: false },
);

export const RoundRelationsInputCreate = t.Object(
  {
    stage: t.Object(
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
    matches: t.Optional(
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
  },
  { additionalProperties: false },
);

export const RoundRelationsInputUpdate = t.Partial(
  t.Object(
    {
      stage: t.Object(
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
      matches: t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const RoundWhere = t.Partial(
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
          stageId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Round" },
  ),
);

export const RoundWhereUnique = t.Recursive(
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
              stageId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Round" },
);

export const RoundSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      order: t.Boolean(),
      stageId: t.Boolean(),
      stage: t.Boolean(),
      matches: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const RoundInclude = t.Partial(
  t.Object(
    { stage: t.Boolean(), matches: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const RoundOrderBy = t.Partial(
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
      stageId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Round = t.Composite([RoundPlain, RoundRelations], {
  additionalProperties: false,
});

export const RoundInputCreate = t.Composite(
  [RoundPlainInputCreate, RoundRelationsInputCreate],
  { additionalProperties: false },
);

export const RoundInputUpdate = t.Composite(
  [RoundPlainInputUpdate, RoundRelationsInputUpdate],
  { additionalProperties: false },
);
