import { router, publicProcedure } from "../trpc";
import { DateTime } from "luxon";
import { env } from "../../../env/server.mjs";
import { z } from 'zod';
import { TMDBMovieDetails } from '../../../types/tmdb.types';

export const requestRouter = router({
  getNewest: publicProcedure.query(async ({ ctx }) => {
    const requests = await ctx.prisma.requests.findMany({
      where: {
        addedDate: {
          gte: DateTime.now().minus({ days: 7 }).toJSDate(),
        },
      },
      orderBy: {
        addedDate: "desc",
      },
      take: 6,
    });

    if (requests) {
      const withOmdbData = requests.map(async (movie) => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${env.TMDB_KEY}`);
        const res: TMDBMovieDetails = await data.json();
        return {
          ...movie,
          tmdb: {
            plot: res.overview,
            poster: res.poster_path,
          },
        };
      });

      return Promise.all(withOmdbData);
    }
  }),
  searchRequests: publicProcedure
    .input(z.object({
        term: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
        const possibleMatches = await ctx.prisma.requests.findMany({
            where: {
                title: {
                    contains: input.term,
                }
            }
        })
        
        return possibleMatches;
    }),
    submitRequest: publicProcedure
        .input(z.object({
            title: z.string(),
            year: z.number(),
            comments: z.string().optional(),
            movieId: z.number(),
        }))
        .mutation(async ({ input, ctx }) => {
            const newRequest = await ctx.prisma.requests.create({
                data: {
                    title: input.title,
                    addedDate: new Date(),
                    year: input.year,
                    movieId: input.movieId,
                    comments: input.comments,
                }
            });

            return newRequest;
        })
});
