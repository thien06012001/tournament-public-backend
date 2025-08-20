import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TournamentPlain = t.Object(
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
);

export const TournamentRelations = t.Object(
  {
    leaderboard: __nullable__(
      t.Object(
        { id: t.String(), tournamentId: t.String() },
        { additionalProperties: false },
      ),
    ),
    participants: t.Array(
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
    stages: t.Array(
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
      { additionalProperties: false },
    ),
    sport: __nullable__(
      t.Object(
        {
          id: t.String(),
          name: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    Theme: __nullable__(
      t.Object(
        {
          id: t.String(),
          enabled: t.Boolean(),
          colors: t.String(),
          tournamentId: t.String(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const TournamentPlainInputCreate = t.Object(
  {
    name: t.String(),
    location: t.String(),
    type: t.Union([t.Literal("individual"), t.Literal("team")], {
      additionalProperties: false,
    }),
    description: t.String(),
    startDate: t.Date(),
    endDate: t.Date(),
    banner: t.Optional(__nullable__(t.String())),
    background: t.Optional(__nullable__(t.String())),
    thumbnail: t.Optional(__nullable__(t.String())),
    theme: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const TournamentPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    location: t.Optional(t.String()),
    type: t.Optional(
      t.Union([t.Literal("individual"), t.Literal("team")], {
        additionalProperties: false,
      }),
    ),
    description: t.Optional(t.String()),
    startDate: t.Optional(t.Date()),
    endDate: t.Optional(t.Date()),
    banner: t.Optional(__nullable__(t.String())),
    background: t.Optional(__nullable__(t.String())),
    thumbnail: t.Optional(__nullable__(t.String())),
    theme: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const TournamentRelationsInputCreate = t.Object(
  {
    leaderboard: t.Optional(
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
    participants: t.Optional(
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
    stages: t.Optional(
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
    sport: t.Optional(
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
    Theme: t.Optional(
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

export const TournamentRelationsInputUpdate = t.Partial(
  t.Object(
    {
      leaderboard: t.Partial(
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
      participants: t.Partial(
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
      stages: t.Partial(
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
      sport: t.Partial(
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
      Theme: t.Partial(
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

export const TournamentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          banner: t.String(),
          background: t.String(),
          thumbnail: t.String(),
          theme: t.String(),
          sportId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Tournament" },
  ),
);

export const TournamentWhereUnique = t.Recursive(
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
              banner: t.String(),
              background: t.String(),
              thumbnail: t.String(),
              theme: t.String(),
              sportId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Tournament" },
);

export const TournamentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      location: t.Boolean(),
      type: t.Boolean(),
      description: t.Boolean(),
      startDate: t.Boolean(),
      endDate: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      banner: t.Boolean(),
      background: t.Boolean(),
      thumbnail: t.Boolean(),
      leaderboard: t.Boolean(),
      theme: t.Boolean(),
      participants: t.Boolean(),
      stages: t.Boolean(),
      sport: t.Boolean(),
      sportId: t.Boolean(),
      Theme: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TournamentInclude = t.Partial(
  t.Object(
    {
      type: t.Boolean(),
      leaderboard: t.Boolean(),
      participants: t.Boolean(),
      stages: t.Boolean(),
      sport: t.Boolean(),
      Theme: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TournamentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      location: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      startDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      endDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      banner: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      background: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      thumbnail: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      theme: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      sportId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Tournament = t.Composite([TournamentPlain, TournamentRelations], {
  additionalProperties: false,
});

export const TournamentInputCreate = t.Composite(
  [TournamentPlainInputCreate, TournamentRelationsInputCreate],
  { additionalProperties: false },
);

export const TournamentInputUpdate = t.Composite(
  [TournamentPlainInputUpdate, TournamentRelationsInputUpdate],
  { additionalProperties: false },
);
