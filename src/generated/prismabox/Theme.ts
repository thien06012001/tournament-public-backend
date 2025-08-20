import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ThemePlain = t.Object(
  {
    id: t.String(),
    enabled: t.Boolean(),
    colors: t.String(),
    tournamentId: t.String(),
  },
  { additionalProperties: false },
);

export const ThemeRelations = t.Object(
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
  },
  { additionalProperties: false },
);

export const ThemePlainInputCreate = t.Object(
  { enabled: t.Optional(t.Boolean()), colors: t.String() },
  { additionalProperties: false },
);

export const ThemePlainInputUpdate = t.Object(
  { enabled: t.Optional(t.Boolean()), colors: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const ThemeRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const ThemeRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const ThemeWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          enabled: t.Boolean(),
          colors: t.String(),
          tournamentId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Theme" },
  ),
);

export const ThemeWhereUnique = t.Recursive(
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
            {
              id: t.String(),
              enabled: t.Boolean(),
              colors: t.String(),
              tournamentId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Theme" },
);

export const ThemeSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      enabled: t.Boolean(),
      colors: t.Boolean(),
      tournamentId: t.Boolean(),
      tournament: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ThemeInclude = t.Partial(
  t.Object(
    { tournament: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ThemeOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      enabled: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      colors: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      tournamentId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Theme = t.Composite([ThemePlain, ThemeRelations], {
  additionalProperties: false,
});

export const ThemeInputCreate = t.Composite(
  [ThemePlainInputCreate, ThemeRelationsInputCreate],
  { additionalProperties: false },
);

export const ThemeInputUpdate = t.Composite(
  [ThemePlainInputUpdate, ThemeRelationsInputUpdate],
  { additionalProperties: false },
);
