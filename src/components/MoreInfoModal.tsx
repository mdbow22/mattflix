import { Collections, Directors, Genres, Movies } from "@prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";

const MoreInfoModal: React.FC<{ movie: (Movies & {
    Directors: Directors;
    Genres: Genres;
    Collections: Collections | null;
}) }> = ({ movie }) => {
  const [opened, setOpened] = useState(false);
  const { data, isSuccess, isError } = trpc.movies.getOmdb.useQuery(
    { id: movie.movieId! },
    {
      enabled: opened,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      <label
        htmlFor={`modal-${movie.movieId}`}
        className="modal-button btn btn-secondary btn-xs"
        onClick={() => setOpened(true)}
      >
        More Info
      </label>
      <input
        type="checkbox"
        id={`modal-${movie.movieId}`}
        className="modal-toggle"
      />
      <div className="modal backdrop-blur-md">
        <div className="modal-box relative w-full sm:w-1/2 max-w-2xl">
          <label
            htmlFor={`modal-${movie.movieId}`}
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>

          {isSuccess && (
            <div className="mt-5 flex items-stretch justify-between gap-5">
              <div className="w-1/3">
                <img src={data?.Poster} className="object-cover" />
              </div>
              <div className="flex w-2/3 flex-col justify-start gap-5">
                <div className='whitespace-normal'>
                <h3 className="text-left text-xl font-bold ">{movie.title} <span className='badge whitespace-normal'>{data.Rated}</span></h3>
                </div>
                <h4 className="whitespace-normal text-left text-sm">
                  Director: {movie.Directors.name}
                </h4>
                <h4 className="whitespace-normal text-left text-sm">
                  Written By: {data?.Writer}
                </h4>
                <p className="whitespace-pre-wrap text-left">{data?.Plot}</p>
              </div>
            </div>
          )}
          {isError && <p>Unable to load data for {movie.title}</p>}
        </div>
      </div>
    </div>
  );
};

export default MoreInfoModal;
