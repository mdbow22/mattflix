import { router, publicProcedure } from "../trpc";
import { DateTime } from 'luxon';
import { env } from '../../../env/server.mjs';

export const movieRouter = router({
  getLatest: publicProcedure
    .query(async ({ ctx }) => {
      const recentMovies = await ctx.prisma.movies.findMany({
        where: {
            addedDate: {
                gte: DateTime.now().minus({ days: 7 }).toJSDate(),
            }
        },
        orderBy: {
            addedDate: 'desc',
        },
        take: 6,
      })

      if(recentMovies) {
        const withOmdbData = recentMovies.map(async movie => {
            const data = await fetch(`http://www.omdbapi.com/?apikey=${env.OMDB_KEY}&i=${movie.movieId}`);
            const res = await data.json();
            return (
                {
                    ...movie,
                    omdb: {
                        rating: res.Rated,
                        plot: res.Plot,
                        poster: res.Poster,
                    }
                }
            )
        })

        return Promise.all(withOmdbData);
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.movies.findMany();
  }),
});