import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const LeaderboardPlain = t.Object(
  { id: t.String(), tournamentId: t.String() },
  { additionalProperties: false },
);

export const LeaderboardRelations = t.Object(
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
    rankings: t.Array(
      t.Object(
        {
          id: t.String(),
          ranking: t.Integer(),
          leaderboardId: t.String(),
          participantId: t.String(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const LeaderboardPlainInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const LeaderboardPlainInputUpdate = t.Object(
  {},
  { additionalProperties: false },
);

export const LeaderboardRelationsInputCreate = t.Object(
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
    rankings: t.Optional(
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

export const LeaderboardRelationsInputUpdate = t.Partial(
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
      rankings: t.Partial(
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

export const LeaderboardWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          tournamentId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Leaderboard" },
  ),
);

export const LeaderboardWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), tournamentId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ tournamentId: t.String() }),
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
            { id: t.String(), tournamentId: t.String() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Leaderboard" },
);

export const LeaderboardSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      tournamentId: t.Boolean(),
      tournament: t.Boolean(),
      rankings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const LeaderboardInclude = t.Partial(
  t.Object(
    { tournament: t.Boolean(), rankings: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const LeaderboardOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      tournamentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Leaderboard = t.Composite(
  [LeaderboardPlain, LeaderboardRelations],
  { additionalProperties: false },
);

export const LeaderboardInputCreate = t.Composite(
  [LeaderboardPlainInputCreate, LeaderboardRelationsInputCreate],
  { additionalProperties: false },
);

export const LeaderboardInputUpdate = t.Composite(
  [LeaderboardPlainInputUpdate, LeaderboardRelationsInputUpdate],
  { additionalProperties: false },
);
