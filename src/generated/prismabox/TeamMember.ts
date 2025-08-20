import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TeamMemberPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    email: __nullable__(t.String()),
    phone: __nullable__(t.String()),
    order: t.Integer(),
    tournamentParticipantId: t.String(),
  },
  { additionalProperties: false },
);

export const TeamMemberRelations = t.Object(
  {
    tournamentParticipant: t.Object(
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

export const TeamMemberPlainInputCreate = t.Object(
  {
    name: t.String(),
    email: t.Optional(__nullable__(t.String())),
    phone: t.Optional(__nullable__(t.String())),
    order: t.Integer(),
  },
  { additionalProperties: false },
);

export const TeamMemberPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    email: t.Optional(__nullable__(t.String())),
    phone: t.Optional(__nullable__(t.String())),
    order: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const TeamMemberRelationsInputCreate = t.Object(
  {
    tournamentParticipant: t.Object(
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

export const TeamMemberRelationsInputUpdate = t.Partial(
  t.Object(
    {
      tournamentParticipant: t.Object(
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

export const TeamMemberWhere = t.Partial(
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
          phone: t.String(),
          order: t.Integer(),
          tournamentParticipantId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "TeamMember" },
  ),
);

export const TeamMemberWhereUnique = t.Recursive(
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
              phone: t.String(),
              order: t.Integer(),
              tournamentParticipantId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "TeamMember" },
);

export const TeamMemberSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      email: t.Boolean(),
      phone: t.Boolean(),
      order: t.Boolean(),
      tournamentParticipant: t.Boolean(),
      tournamentParticipantId: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TeamMemberInclude = t.Partial(
  t.Object(
    { tournamentParticipant: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const TeamMemberOrderBy = t.Partial(
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
      phone: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      order: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      tournamentParticipantId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const TeamMember = t.Composite([TeamMemberPlain, TeamMemberRelations], {
  additionalProperties: false,
});

export const TeamMemberInputCreate = t.Composite(
  [TeamMemberPlainInputCreate, TeamMemberRelationsInputCreate],
  { additionalProperties: false },
);

export const TeamMemberInputUpdate = t.Composite(
  [TeamMemberPlainInputUpdate, TeamMemberRelationsInputUpdate],
  { additionalProperties: false },
);
