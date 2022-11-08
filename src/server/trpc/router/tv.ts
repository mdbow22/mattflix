import { router, publicProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";
import { z } from "zod";
import {
    MovieProvidersType,
  TMDBSearchTV,
  TVSearch,
} from "../../../types/tmdb.types";

export const tvRouter = router({
  searchTV: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const tmdb = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${
          env.TMDB_KEY
        }&query=${input.name.split(" ").join("+")}`
      );

      if (tmdb.ok) {
        const data: TVSearch = await tmdb.json();
        if (data.total_results > 0) {
          const possibleMatches = await ctx.prisma.tVShows.findMany({
            where: {
              tvId: {
                in: data.results.map((tv) => tv.id),
              },
            },
            select: {
              tvId: true,
            },
          });

          const possibleRequests = await ctx.prisma.tVRequest.findMany({
            where: {
              tvId: {
                in: data.results.map((tv) => tv.id),
              },
            },
            select: {
              tvId: true,
            },
          });

          const justIds = possibleMatches.map((tv) => tv.tvId);
          const justReqIds = possibleRequests.map((tv) => tv.tvId);

          const returnData: TMDBSearchTV[] = data.results.map((movie) => {
            return {
              ...movie,
              inCatalogue: justIds.includes(movie.id),
              requested: justReqIds.includes(movie.id),
            };
          });

          return returnData;
        }
      }

      return [];
    }),
    getStreamingInfo: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ input }) => {
      const data = await fetch(`https://api.themoviedb.org/3/tv/${input.id}/watch/providers?api_key=${env.TMDB_KEY}`);

      const providers: MovieProvidersType = data.ok ? await data.json() : null;
     
      if(providers.results && Object.values(providers.results).length) {

        return providers.results.US?.flatrate
      }
    })
});
