import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const sessionPlain = t.Object(
  {
    id: t.String(),
    expiresAt: t.Date(),
    token: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    ipAddress: __nullable__(t.String()),
    userAgent: __nullable__(t.String()),
    userId: t.String(),
  },
  { additionalProperties: false },
);

export const sessionRelations = t.Object(
  {
    users: t.Object(
      {
        id: t.String(),
        email: t.String(),
        role: t.Union([t.Literal("SuperAdmin"), t.Literal("Admin")], {
          additionalProperties: false,
        }),
        activated: t.Boolean(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const sessionPlainInputCreate = t.Object(
  {
    expiresAt: t.Date(),
    token: t.String(),
    updatedAt: t.Date(),
    ipAddress: t.Optional(__nullable__(t.String())),
    userAgent: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const sessionPlainInputUpdate = t.Object(
  {
    expiresAt: t.Optional(t.Date()),
    token: t.Optional(t.String()),
    updatedAt: t.Optional(t.Date()),
    ipAddress: t.Optional(__nullable__(t.String())),
    userAgent: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const sessionRelationsInputCreate = t.Object(
  {
    users: t.Object(
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

export const sessionRelationsInputUpdate = t.Partial(
  t.Object(
    {
      users: t.Object(
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

export const sessionWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          expiresAt: t.Date(),
          token: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          ipAddress: t.String(),
          userAgent: t.String(),
          userId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "session" },
  ),
);

export const sessionWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), token: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ token: t.String() })],
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
              expiresAt: t.Date(),
              token: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              ipAddress: t.String(),
              userAgent: t.String(),
              userId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "session" },
);

export const sessionSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      expiresAt: t.Boolean(),
      token: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      ipAddress: t.Boolean(),
      userAgent: t.Boolean(),
      userId: t.Boolean(),
      users: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const sessionInclude = t.Partial(
  t.Object(
    { users: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const sessionOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      token: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ipAddress: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userAgent: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const session = t.Composite([sessionPlain, sessionRelations], {
  additionalProperties: false,
});

export const sessionInputCreate = t.Composite(
  [sessionPlainInputCreate, sessionRelationsInputCreate],
  { additionalProperties: false },
);

export const sessionInputUpdate = t.Composite(
  [sessionPlainInputUpdate, sessionRelationsInputUpdate],
  { additionalProperties: false },
);
