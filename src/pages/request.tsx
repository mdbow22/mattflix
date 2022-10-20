import { Movies } from "@prisma/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { OmdbResponse } from '../server/trpc/router/movies';
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
    PossibleMatchMovie[] | undefined
  >();
  const [filteredResults, setFilteredResults] = useState<
  PossibleMatchMovie[] | undefined
>();

  const searchMovies = trpc.movies.searchMovies.useMutation();

  const movieSearch = (value: string) => {
    setTitle(value);
    if (value.length === 3 || (value.length > 3 && value.length % 2 === 0)) {
      searchMovies.mutate({
        title: value.toLowerCase().split(' ').join('+'),
      });
    } else if(value.length > 3 && movieResults?.length) {
        setFilteredResults(movieResults.filter(movie => movie.Title.toLowerCase().includes(title.toLowerCase())));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (searchMovies.data) {
      setMovieResults(searchMovies.data);
      setFilteredResults(searchMovies.data);
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
            onChange={(e) => movieSearch(e.target.value)}
          />
        </div>
      </form>
      {!!filteredResults?.length && (
        <>
          <h2 className="text-3xl mt-10">Possible Matches</h2>
          <div className="mt-5 flex flex-wrap gap-10">
            {filteredResults?.map((movie) => {
              return (
                <div key={movie.imdbID} className="flex flex-col justify-between text-center text-lg w-32">
                  <img
                    className="w-32"
                    src={movie.Poster}
                    alt={`Poster for ${movie.Title}`}
                  />
                  <span>{movie.Title}</span>
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
