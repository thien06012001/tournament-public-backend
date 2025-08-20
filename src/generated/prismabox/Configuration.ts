import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ConfigurationPlain = t.Object(
  { id: t.String(), createdAt: t.Date(), updatedAt: t.Date() },
  { additionalProperties: false },
);

export const ConfigurationRelations = t.Object(
  {},
  { additionalProperties: false },
);

export const ConfigurationPlainInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const ConfigurationPlainInputUpdate = t.Object(
  {},
  { additionalProperties: false },
);

export const ConfigurationRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const ConfigurationRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const ConfigurationWhere = t.Partial(
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
        },
        { additionalProperties: false },
      ),
    { $id: "Configuration" },
  ),
);

export const ConfigurationWhereUnique = t.Recursive(
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
            { id: t.String(), createdAt: t.Date(), updatedAt: t.Date() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Configuration" },
);

export const ConfigurationSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ConfigurationInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const ConfigurationOrderBy = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const Configuration = t.Composite(
  [ConfigurationPlain, ConfigurationRelations],
  { additionalProperties: false },
);

export const ConfigurationInputCreate = t.Composite(
  [ConfigurationPlainInputCreate, ConfigurationRelationsInputCreate],
  { additionalProperties: false },
);

export const ConfigurationInputUpdate = t.Composite(
  [ConfigurationPlainInputUpdate, ConfigurationRelationsInputUpdate],
  { additionalProperties: false },
);
