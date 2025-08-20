import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StageType = t.Union(
  [
    t.Literal("SingleElimination"),
    t.Literal("DoubleElimination"),
    t.Literal("Round"),
    t.Literal("Leaderboard"),
  ],
  { additionalProperties: false },
);
