// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { movieRouter } from './movies';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  movies: movieRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
