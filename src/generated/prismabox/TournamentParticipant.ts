import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TournamentParticipantPlain = t.Object(
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
);

export const TournamentParticipantRelations = t.Object(
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
    members: t.Array(
      t.Object(
        {
          id: t.String(),
          name: t.String(),
          email: __nullable__(t.String()),
          phone: __nullable__(t.String()),
          order: t.Integer(),
          tournamentParticipantId: t.String(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    participantOneMatches: t.Array(
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
    participantTwoMatches: t.Array(
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
    wonMatches: t.Array(
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
    ranking: __nullable__(
      t.Object(
        {
          id: t.String(),
          ranking: t.Integer(),
          result: __nullable__(t.String()),
          leaderboardId: t.String(),
          participantId: t.String(),
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
  },
  { additionalProperties: false },
);

export const TournamentParticipantPlainInputCreate = t.Object(
  {
    name: t.String(),
    email: t.Optional(__nullable__(t.String())),
    order: t.Integer(),
    phone: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const TournamentParticipantPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    email: t.Optional(__nullable__(t.String())),
    order: t.Optional(t.Integer()),
    phone: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const TournamentParticipantRelationsInputCreate = t.Object(
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
    members: t.Optional(
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
    participantOneMatches: t.Optional(
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
    participantTwoMatches: t.Optional(
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
    wonMatches: t.Optional(
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
    ranking: t.Optional(
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
  },
  { additionalProperties: false },
);

export const TournamentParticipantRelationsInputUpdate = t.Partial(
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
      members: t.Partial(
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
      participantOneMatches: t.Partial(
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
      participantTwoMatches: t.Partial(
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
      wonMatches: t.Partial(
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
      ranking: t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const TournamentParticipantWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          email: t.String(),
          order: t.Integer(),
          phone: t.String(),
          tournamentId: t.String(),
          stageId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "TournamentParticipant" },
  ),
);

export const TournamentParticipantWhereUnique = t.Recursive(
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
              email: t.String(),
              order: t.Integer(),
              phone: t.String(),
              tournamentId: t.String(),
              stageId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "TournamentParticipant" },
);

export const TournamentParticipantSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      email: t.Boolean(),
      order: t.Boolean(),
      phone: t.Boolean(),
      tournamentId: t.Boolean(),
      tournament: t.Boolean(),
      members: t.Boolean(),
      participantOneMatches: t.Boolean(),
      participantTwoMatches: t.Boolean(),
      wonMatches: t.Boolean(),
      ranking: t.Boolean(),
      stage: t.Boolean(),
      stageId: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TournamentParticipantInclude = t.Partial(
  t.Object(
    {
      tournament: t.Boolean(),
      members: t.Boolean(),
      participantOneMatches: t.Boolean(),
      participantTwoMatches: t.Boolean(),
      wonMatches: t.Boolean(),
      ranking: t.Boolean(),
      stage: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TournamentParticipantOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      order: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      phone: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      tournamentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      stageId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const TournamentParticipant = t.Composite(
  [TournamentParticipantPlain, TournamentParticipantRelations],
  { additionalProperties: false },
);

export const TournamentParticipantInputCreate = t.Composite(
  [
    TournamentParticipantPlainInputCreate,
    TournamentParticipantRelationsInputCreate,
  ],
  { additionalProperties: false },
);

export const TournamentParticipantInputUpdate = t.Composite(
  [
    TournamentParticipantPlainInputUpdate,
    TournamentParticipantRelationsInputUpdate,
  ],
  { additionalProperties: false },
);
