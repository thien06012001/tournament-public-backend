import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TournamentType = t.Union(
  [t.Literal("individual"), t.Literal("team")],
  { additionalProperties: false },
);
