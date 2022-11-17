import { router, publicProcedure } from "../trpc";
import { DateTime } from "luxon";
import { env } from "../../../env/server.mjs";
import { z } from 'zod';
import { TMDBMovieDetails } from '../../../types/tmdb.types';

export const requestRouter = router({
  getAllRequests: publicProcedure.query(async ({ ctx }) => {
    const tvRequests = await ctx.prisma.tVRequest.findMany({
      where: {
        completed: null,
      }
    });
    const movieRequests = await ctx.prisma.requests.findMany({
      where: {
        completed: null,
      }
    });

    return ({
      movieRequests,
      tvRequests,
    })
  }),
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
        }),
    submitTVRequest: publicProcedure
        .input(z.object({
          name: z.string(),
          originalAir: z.number(),
          comments: z.string().optional(),
          tvId: z.number(),
        }))
        .mutation(async ({ input, ctx }) => {
          const newRequest = await ctx.prisma.tVRequest.create({
            data: {
              name: input.name,
              addedDate: new Date(),
              originalAir: input.originalAir,
              comments: input.comments,
              tvId: input.tvId,
            }
          });

          return newRequest;
        }),
    convertMovieRequest: publicProcedure
        .input(z.object({
          title: z.string(),
          director: z.string(),
          addedDate: z.date(),
          genre: z.string(),
          collection: z.string().optional(),
          releaseYear: z.number(),
          rtScore: z.number(),
          movieId: z.number(),
        }))
        .mutation(async ({ input, ctx }) => {

          const titleArr = input.title.split(' ');

          if(titleArr[0] === 'The' || titleArr[0] === 'A' || titleArr[0] === 'An') {
            titleArr.shift();
          }

          const query = {
            title: input.title,
            addedDate: input.addedDate,
            releaseYear: input.releaseYear,
            rtScore: input.rtScore,
            movieId: input.movieId,
            sortTitle: titleArr.join(' '),
            Directors: {
              connectOrCreate: {
                create: {
                  name: input.director,
                },
                where: {
                  name: input.director,
                }
              }
            },
            Genres: {
              connectOrCreate: {
                create: {
                  name: input.genre,
                },
                where: {
                  name: input.genre,
                }
              }
            },
            ...(input.collection && { Collections: { connectOrCreate: { create: { name: input.collection }, where: { name: input.collection }}}})
          }

          const newMovie = await ctx.prisma.movies.create({
            data: query,
          })

          if(newMovie) {

            const completeRequest = await ctx.prisma.requests.update({
              where: {
                movieId: input.movieId,
              },
              data: {
                completed: new Date(),
              }
            })

            return {newMovie, completeRequest};
          }
        }),
});
