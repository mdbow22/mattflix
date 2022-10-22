import { NextPage } from "next";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { TMDBSearchMovie } from '../types/tmdb.types';
import { useDebounce } from '../utils/debounce';
import { trpc } from "../utils/trpc";

export interface PossibleMatchMovie {
    inCatalogue: boolean;
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const Request: NextPage = () => {
  const [title, setTitle] = useState("");
  const [movieResults, setMovieResults] = useState<
    TMDBSearchMovie[] | undefined
  >();

  const searchMovies = trpc.movies.searchMovies.useMutation();
  const searchTerm = useDebounce(title, 500)

useEffect(() => {
    if(searchTerm) {
        searchMovies.mutate({
            title: searchTerm.toLowerCase(),
            });
    }
}, [searchTerm])

  useEffect(() => {
    if (searchMovies.data) {
      setMovieResults(searchMovies.data);
    }
  }, [searchMovies.data]);

  return (
    <div className="container mx-auto mt-10 max-w-5xl">
      <h1 className="text-5xl">New Request</h1>
      <form className="mt-10">
        <div className="form-control">
          <label htmlFor="movieTitle" className="label">
            <span className="label-text text-xl">Title</span>
          </label>
          <input
            type="text"
            id="movieTitle"
            className="input input-bordered input-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </form>
      {!!movieResults?.length && (
        <>
          <h2 className="text-3xl mt-10">Possible Matches</h2>
          <div className="mt-5 flex flex-wrap gap-10 justify-between">
            {movieResults?.sort((a, b) => a.vote_average > b.vote_average ? -1 : 1)?.map((movie) => {
              return (
                <div key={movie.id} className="flex flex-col justify-between text-center text-lg w-40">
                  <Image
                    className="w-40"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Poster for ${movie.title}`}
                  />
                  <span>{movie.title}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Request;
