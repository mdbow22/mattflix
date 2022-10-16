import { router, publicProcedure } from "../trpc";
import { DateTime } from "luxon";
import { env } from "../../../env/server.mjs";

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
        const data = await fetch(
          `http://www.omdbapi.com/?apikey=${env.OMDB_KEY}&i=${movie.movieId}`
        );
        const res = await data.json();
        return {
          ...movie,
          omdb: {
            rating: res.Rated,
            plot: res.Plot,
            poster: res.Poster,
          },
        };
      });

      return Promise.all(withOmdbData);

    }
  }),
});
