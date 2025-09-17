import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const verificationPlain = t.Object(
  {
    id: t.String(),
    value: t.String(),
    expiresAt: t.Date(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    userId: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const verificationRelations = t.Object(
  {
    users: __nullable__(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const verificationPlainInputCreate = t.Object(
  { value: t.String(), expiresAt: t.Date(), updatedAt: t.Date() },
  { additionalProperties: false },
);

export const verificationPlainInputUpdate = t.Object(
  {
    value: t.Optional(t.String()),
    expiresAt: t.Optional(t.Date()),
    updatedAt: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const verificationRelationsInputCreate = t.Object(
  {
    users: t.Optional(
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

export const verificationRelationsInputUpdate = t.Partial(
  t.Object(
    {
      users: t.Partial(
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

export const verificationWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          value: t.String(),
          expiresAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          userId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "verification" },
  ),
);

export const verificationWhereUnique = t.Recursive(
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
              value: t.String(),
              expiresAt: t.Date(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              userId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "verification" },
);

export const verificationSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      value: t.Boolean(),
      expiresAt: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      userId: t.Boolean(),
      users: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const verificationInclude = t.Partial(
  t.Object(
    { users: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const verificationOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      value: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const verification = t.Composite(
  [verificationPlain, verificationRelations],
  { additionalProperties: false },
);

export const verificationInputCreate = t.Composite(
  [verificationPlainInputCreate, verificationRelationsInputCreate],
  { additionalProperties: false },
);

export const verificationInputUpdate = t.Composite(
  [verificationPlainInputUpdate, verificationRelationsInputUpdate],
  { additionalProperties: false },
);
