import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const usersPlain = t.Object(
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
);

export const usersRelations = t.Object(
  {
    session: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
    verification: t.Array(
      t.Object(
        {
          id: t.String(),
          value: t.String(),
          expiresAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          userId: __nullable__(t.String()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const usersPlainInputCreate = t.Object(
  {
    email: t.String(),
    role: t.Optional(
      t.Union([t.Literal("SuperAdmin"), t.Literal("Admin")], {
        additionalProperties: false,
      }),
    ),
    activated: t.Optional(t.Boolean()),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const usersPlainInputUpdate = t.Object(
  {
    email: t.Optional(t.String()),
    role: t.Optional(
      t.Union([t.Literal("SuperAdmin"), t.Literal("Admin")], {
        additionalProperties: false,
      }),
    ),
    activated: t.Optional(t.Boolean()),
    updatedAt: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const usersRelationsInputCreate = t.Object(
  {
    session: t.Optional(
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
    verification: t.Optional(
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

export const usersRelationsInputUpdate = t.Partial(
  t.Object(
    {
      session: t.Partial(
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
      verification: t.Partial(
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

export const usersWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
    { $id: "users" },
  ),
);

export const usersWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), email: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ email: t.String() })],
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
      ],
      { additionalProperties: false },
    ),
  { $id: "users" },
);

export const usersSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      email: t.Boolean(),
      role: t.Boolean(),
      activated: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      session: t.Boolean(),
      verification: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const usersInclude = t.Partial(
  t.Object(
    {
      role: t.Boolean(),
      session: t.Boolean(),
      verification: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const usersOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      activated: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const users = t.Composite([usersPlain, usersRelations], {
  additionalProperties: false,
});

export const usersInputCreate = t.Composite(
  [usersPlainInputCreate, usersRelationsInputCreate],
  { additionalProperties: false },
);

export const usersInputUpdate = t.Composite(
  [usersPlainInputUpdate, usersRelationsInputUpdate],
  { additionalProperties: false },
);
