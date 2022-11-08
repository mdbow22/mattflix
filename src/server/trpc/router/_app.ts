// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { movieRouter } from './movies';
import { requestRouter } from './requests';
import { tvRouter } from './tv';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  movies: movieRouter,
  requests: requestRouter,
  tv: tvRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
