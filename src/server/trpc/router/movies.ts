import { router, publicProcedure } from "../trpc";
import { DateTime } from "luxon";
import { env } from "../../../env/server.mjs";
import { z } from 'zod';
import { TMDBSearchMovie, TMDBSearch, TMDBMovieDetails, MovieProvidersType, Credits } from '../../../types/tmdb.types';

export const movieRouter = router({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const recentMovies = await ctx.prisma.movies.findMany({
      where: {
        addedDate: {
          gte: DateTime.now().minus({days: 30}).toJSDate(),
        },
      },
      include: {
        Directors: true,
        Collections: true,
        Genres: true,
      },
      orderBy: {
        addedDate: "desc",
      },
      take: 6,
    });

    if (recentMovies) {
      const withOmdbData = recentMovies.map(async (movie) => {
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
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movies.findMany({
      orderBy: {
        sortTitle: 'asc',
      },
      include: {
        Directors: true,
        Collections: true,
        Genres: true,
      },
    });
  }),
  getTMDB: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query( async ({ input }) => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${input.id}?api_key=${env.TMDB_KEY}`);
      const res: TMDBMovieDetails = await data.json();

      return res;
    }),
  searchMovies: publicProcedure
    .input(z.object({
      title: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      console.log('Title passed: ', input.title);
      const tmdb = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${env.TMDB_KEY}&query=${input.title.split(' ').join('+')}`)
      if(tmdb.ok) {
        const data: TMDBSearch = await tmdb.json();

        if(data.total_results > 0) {

          const possibleMatches = await ctx.prisma.movies.findMany({
            where: {
              movieId: {
                in: data.results.map(movie => movie.id),
              }
            },
            select: {
              movieId: true,
            }
          })

          const possibleRequests = await ctx.prisma.requests.findMany({
            where: {
              movieId: {
                in: data.results.map(movie => movie.id),
              }
            },
            select: {
              movieId: true,
            }
          })

          const justIds = possibleMatches.map(movie => movie.movieId);
          const justReqIds = possibleRequests.map(movie => movie.movieId);

          const returnData: TMDBSearchMovie[] = data.results.map(movie => {
            return ({
              ...movie,
              inCatalogue: justIds.includes(movie.id),
              requested: justReqIds.includes(movie.id),
            })
          })

          return returnData;
        }

        return [];
      }
    }),
  getStreamingInfo: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ input }) => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${input.id}/watch/providers?api_key=${env.TMDB_KEY}`);

      const providers: MovieProvidersType = data.ok ? await data.json() : null;
     
      if(providers.results && Object.values(providers.results).length) {

        return providers.results.US?.flatrate
      }
    }),
  getCredits: publicProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async ({ input }) => {
      const data = await fetch(`https://api.themoviedb.org/3/movie/${input.id}/credits?api_key=${env.TMDB_KEY}`);

      const credits: Credits = data.ok ? await data.json() : null;
      if(credits) {
        return credits;
      }

      return null;
    })
  
});
