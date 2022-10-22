import { router, publicProcedure } from "../trpc";
import { DateTime } from "luxon";
import { env } from "../../../env/server.mjs";
import { z } from 'zod';
import { TMDBSearchMovie, TMDBSearch, TMDBMovieDetails } from '../../../types/tmdb.types';

export interface OmdbRatings {
  Source: string;
  Value: string; // formats: 6.4/10 or 81% or 58/100
}

export interface OmdbResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released:string; // format: 21 Oct 1988
  Runtime: string; // format: 105min
  Genre: string; // csv
  Director: string;
  Writer: string; //csv
  Actors: string; // csv
  Plot: string;
  Language: string;
  Country: string;
  Awards: string; // format: 16 wins & 48 nominations
  Poster: string;
  Ratings: OmdbRatings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string; // format: 24 Apr 2007
  BoxOffice: string; //format: $3,966,256
  Production: string;
  Website: string;
  Response: string; //format True
  inCatalogue?: boolean;
}

export interface OmdbSearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbSearchResponse {
  Search: OmdbSearchItem[];
  totalResults: string;
  Response: string;
}

export const movieRouter = router({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const recentMovies = await ctx.prisma.movies.findMany({
      where: {
        addedDate: {
          gte: DateTime.now().startOf('month').toJSDate(),
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
        const data = await fetch(
          `http://www.omdbapi.com/?apikey=${env.OMDB_KEY}&i=${movie.movieId}`
        );
        const res: OmdbResponse = await data.json();
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

          const justIds = possibleMatches.map(movie => movie.movieId);

          const returnData: TMDBSearchMovie[] = data.results.map(movie => {
            return ({
              ...movie,
              inCatalogue: justIds.includes(movie.id),
            })
          })

          return returnData;
        }

        return [];
      }
    })
});
