import React, { useState } from "react";
import { TMDBSearchMovie } from "../types/tmdb.types";
import { trpc } from "../utils/trpc";

const RequestModal: React.FC<{
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  movie: TMDBSearchMovie;
}> = ({ movie }) => {
  const [needsProviders, setNeedsProviders] = useState(false);
  const [comments, setComments] = useState('');
  const [requested, setRequested] = useState(movie.requested);
  const {
    data: providers,
    isSuccess,
    isLoading,
  } = trpc.movies.getStreamingInfo.useQuery(
    { id: movie.id },
    {
      enabled: needsProviders,
    }
  );

  const requestMovie = trpc.requests.submitRequest.useMutation({
    onSuccess: () => {
      setRequested(true);
    },
  });

  const submitRequest = () => {
    requestMovie.mutate({
      comments: comments.length ? comments : undefined,
      title: movie.title,
      year: parseInt(movie.release_date.substring(0,4), 10),
      movieId: movie.id,
    })
  }

  return (
    <div>
      <label
        htmlFor={`modal-${movie.id}`}
        className="modal-button btn bg-transparent border-none hover:bg-transparent h-full py-2"
        onClick={() => setNeedsProviders(!movie.inCatalogue ?? true)}
      > {movie.poster_path ?
        <img
        className="w-40 rounded-lg shadow-lg shadow-slate-900"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`Poster for ${movie.title}`}
      /> : <span className='w-40'>{movie.title}</span>
        }
      </label>
      <input
        type="checkbox"
        id={`modal-${movie.id}`}
        className="modal-toggle"
      />
      <div className={`modal backdrop-blur-md`}>
        <div className="modal-box relative w-full max-w-2xl shadow-lg shadow-slate-900/75 sm:w-1/2">
          <label
            htmlFor={`modal-${movie.id}`}
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            x
          </label>
          <div className="flex gap-5">
            <div className="w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                className="rounded-lg object-cover shadow-lg shadow-slate-900"
                alt={`Poster for ${movie?.title}`}
              />
            </div>
            <div className="flex w-2/3 flex-col justify-start gap-5">
              <div className="whitespace-normal">
                <h3 className="text-left text-xl font-bold ">{movie?.title}</h3>
              </div>
              <p className="whitespace-pre-wrap text-left">{movie?.overview}</p>
              {movie?.inCatalogue && (
                <p className="btn btn-outline">Already in Catalogue</p>
              )}
              {!movie?.inCatalogue && (
                <>
                {requested ?
                  <p className="btn btn-outline">Requested!</p>
                : 
                  <>
                    <textarea className='textarea textarea-bordered' placeholder='Put any comments about the request here' onChange={(e) => setComments(e.target.value)}></textarea>
                    <button type='button' className='btn btn-primary' onClick={() => submitRequest()}>Request Movie</button>
                  </>
                }
                </>
              )}
            </div>
          </div>
          {!movie?.inCatalogue && isSuccess && !isLoading && (
            <>
              <h5 className="mt-5 mb-3">Available On: </h5>
              <div className="flex flex-wrap gap-10">
                {providers?.map((provider) => {
                  return (
                    <div key={provider.provider_id}>
                      <img
                        className="w-14"
                        src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
