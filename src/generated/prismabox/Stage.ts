import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StagePlain = t.Object(
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
);

export const StageRelations = t.Object(
  {
    tournament: t.Object(
      {
        id: t.String(),
        name: t.String(),
        location: t.String(),
        type: t.Union([t.Literal("individual"), t.Literal("team")], {
          additionalProperties: false,
        }),
        description: t.String(),
        startDate: t.Date(),
        endDate: t.Date(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        banner: __nullable__(t.String()),
        background: __nullable__(t.String()),
        thumbnail: __nullable__(t.String()),
        theme: __nullable__(t.String()),
        sportId: __nullable__(t.String()),
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
    winners: t.Array(
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
      { additionalProperties: false },
    ),
    rounds: t.Array(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const StagePlainInputCreate = t.Object(
  {
    order: t.Integer(),
    parallelMatches: t.Optional(t.Integer()),
    maxTimePerMatch: t.Optional(t.Number()),
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
);

export const StagePlainInputUpdate = t.Object(
  {
    order: t.Optional(t.Integer()),
    parallelMatches: t.Optional(t.Integer()),
    maxTimePerMatch: t.Optional(t.Number()),
    type: t.Optional(
      t.Union(
        [
          t.Literal("SingleElimination"),
          t.Literal("DoubleElimination"),
          t.Literal("Round"),
          t.Literal("Leaderboard"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const StageRelationsInputCreate = t.Object(
  {
    tournament: t.Object(
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
    winners: t.Optional(
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
    rounds: t.Optional(
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

export const StageRelationsInputUpdate = t.Partial(
  t.Object(
    {
      tournament: t.Object(
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
      winners: t.Partial(
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
      rounds: t.Partial(
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

export const StageWhere = t.Partial(
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
    { $id: "Stage" },
  ),
);

export const StageWhereUnique = t.Recursive(
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
      ],
      { additionalProperties: false },
    ),
  { $id: "Stage" },
);

export const StageSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      order: t.Boolean(),
      parallelMatches: t.Boolean(),
      maxTimePerMatch: t.Boolean(),
      tournamentId: t.Boolean(),
      tournament: t.Boolean(),
      type: t.Boolean(),
      matches: t.Boolean(),
      winners: t.Boolean(),
      rounds: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const StageInclude = t.Partial(
  t.Object(
    {
      tournament: t.Boolean(),
      type: t.Boolean(),
      matches: t.Boolean(),
      winners: t.Boolean(),
      rounds: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const StageOrderBy = t.Partial(
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
      parallelMatches: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      maxTimePerMatch: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      tournamentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Stage = t.Composite([StagePlain, StageRelations], {
  additionalProperties: false,
});

export const StageInputCreate = t.Composite(
  [StagePlainInputCreate, StageRelationsInputCreate],
  { additionalProperties: false },
);

export const StageInputUpdate = t.Composite(
  [StagePlainInputUpdate, StageRelationsInputUpdate],
  { additionalProperties: false },
);
