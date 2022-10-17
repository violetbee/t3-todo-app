// src/server/router/_app.ts
import { router } from "../trpc";

import { exampleRouter } from "./example";
import { listRouter } from "./list";

export const appRouter = router({
  example: exampleRouter,
  list: listRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
