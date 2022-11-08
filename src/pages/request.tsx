import { NextPage } from "next";
import { useEffect, useState } from "react";
import RequestModal from "../components/RequestModal";
import TVRequestModal from '../components/TVRequestModal';
import { TMDBSearchMovie, TMDBSearchTV } from "../types/tmdb.types";
import { useDebounce } from "../utils/debounce";
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
  const [tvShow, setTvShow] = useState(false);
  const [movieResults, setMovieResults] = useState<
    TMDBSearchMovie[] | undefined
  >();
  const [tvResults, setTVResults] = useState<TMDBSearchTV[] | undefined>();

  const searchMovies = trpc.movies.searchMovies.useMutation();
  const searchTV = trpc.tv.searchTV.useMutation();
  const searchTerm = useDebounce(title, 300);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      if(tvShow) {
        searchTV.mutate({
          name: searchTerm.toLowerCase(),
        })
      } else {
        searchMovies.mutate({
          title: searchTerm.toLowerCase(),
        });
      }
    }
  }, [searchTerm, tvShow]);

  useEffect(() => {
    if (searchMovies.data && !tvShow) {
      setMovieResults(searchMovies.data);
      setTVResults(undefined);
    }

    if(searchTV.data && tvShow) {
      setMovieResults(undefined)
      setTVResults(searchTV.data)
    }
  }, [searchMovies.data, searchTV.data, tvShow]);

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
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text text-lg">Movies</span> 
            <input type="checkbox" className="toggle toggle-primary" checked={tvShow} onClick={() => setTvShow(prev => !prev)} />
            <span className='label-text text-lg'>TV Shows</span>
          </label>
        </div>
      </form>
      {!!movieResults?.length && (
        <>
          <h2 className="mt-10 text-3xl">Possible Matches</h2>
          <div className="mt-5 flex flex-wrap justify-between gap-10">
            {movieResults
              ?.sort((a, b) => (a.vote_average > b.vote_average ? -1 : 1))
              ?.map((movie) => {
                return (
                    <div key={movie.id}>
                        <RequestModal
                            show={show}
                            setShow={setShow}
                            movie={movie}
                        />
                    </div>
                );
              })}
          </div>
        </>
      )}
      {!!tvResults?.length && (
        <>
         <h2 className="mt-10 text-3xl">Possible Matches</h2>
          <div className="mt-5 flex flex-wrap justify-between gap-10">
        {tvResults?.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1)
          ?.map(tv => {
            return (
              <div key={tv.id}>
                <TVRequestModal
                  show={show}
                  setShow={setShow}
                  tv={tv}
                />
              </div>
            )
          })
        }
        </div>
        </>
      )}
    </div>
  );
};

export default Request;
