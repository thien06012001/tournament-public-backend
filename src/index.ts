import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp().listen(env.PORT);

console.log(
  `🟢 Read API listening on http://localhost:${env.PORT} (docs: /docs)`
);
