import React from "react";
import { TMDBSearchMovie } from "../types/tmdb.types";

const RequestModal: React.FC<{
  show: boolean;
  setShow: React.Dispatch<
    React.SetStateAction<
      { show: boolean; movie: TMDBSearchMovie | undefined }
    >
  >;
  movie: TMDBSearchMovie | undefined;
}> = ({ show, setShow, movie }) => {
  return (
    <div
      className={`modal backdrop-blur-md ${show ? "modal-open" : ""}`}
    >
      
      <div className="modal-box relative flex w-full max-w-2xl gap-5 sm:w-1/2 shadow-lg shadow-slate-900/75">
      <button
        type="button"
        className="btn btn-circle btn-sm absolute right-2 top-2"
        onClick={() => setShow({ movie: undefined, show: false })}
      >
        x
      </button>
        <div className="w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            className="object-cover rounded-lg shadow-lg shadow-slate-900"
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
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
