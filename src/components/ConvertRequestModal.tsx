import { Requests } from "@prisma/client";
import React, { useEffect, useReducer, useState } from "react";
import { trpc } from "../utils/trpc";

export interface RequestConversion {
    title: string,
    releaseYear: number | null;
    director: string;
    genre: string;
    collection: string | undefined;
    rtScore: number | undefined;
    sortTitle: string;
    movieId: number;
    addedDate: Date;
}

const ConvertRequestModal: React.FC<{ request: Requests }> = ({ request }) => {
  const [opened, setOpened] = useState(false);
  const [submitTried, setSubmitTried] = useState(false);
  const [submitState, setSubmitState] = useState<'loading' | 'success' | 'error' | ''>('');

  const context = trpc.useContext();
  const { data, isSuccess } = trpc.movies.getTMDB.useQuery(
    { id: request.movieId },
    {
      enabled: opened,
      refetchOnWindowFocus: false,
    }
  );

  const { data: credits, isSuccess: creditsSuccess } = trpc.movies.getCredits.useQuery(
    { id: request.movieId },
    {
        enabled: opened,
        refetchOnWindowFocus: false,
    }
  )

  const convertRequest = trpc.requests.convertMovieRequest.useMutation({
    onSuccess: () => {
        setSubmitState('success')
        context.requests.getAllRequests.refetch();
    },
    onError: () => {
        setSubmitState('error');
    }
  });

  const initFormState = {
    title: request.title,
    releaseYear: request.year,
    director: '',
    genre: '',
    collection: undefined,
    rtScore: undefined,
    sortTitle: '',
    movieId: request.movieId,
    addedDate: new Date(),
  };

  const reducer = (state: any, action: {type: string, payload: any}) => {
    switch(action.type) {
        case 'rtScore': {
            return ({
                ...state,
                [action.type]: action.payload ? parseInt(action.payload, 10) : undefined,
            })
        }
        case 'addedDate': {
            return ({
                ...state,
                [action.type]: new Date(action.payload),
            })
        }
        default: {
            return ({
                ...state,
                [action.type]: action.payload,
            })
        }
    }
  }

  const [form, dispatch] = useReducer(reducer, initFormState);

  useEffect(() => {
    if(creditsSuccess && credits) {
        dispatch({ type: 'director', payload: credits.crew.find(crew => crew.job === 'Director')?.name })
    }
  }, [creditsSuccess, credits])

  

  const validForm = () => {
    if(form.genre === '' || !form.addedDate || !form.rtScore) {
        return false;
    }

    return true;
  }

  const submit = () => {
    setSubmitTried(true);
    if(!validForm()) {
        return;
    }
    setSubmitState('loading')
    convertRequest.mutate(form);
  }

  return (
    <div>
      <label
        htmlFor={`modal-${request.movieId}`}
        className="modal-button link"
        onClick={() => setOpened(true)}
      >
        {request.title}
      </label>
      <input
        type="checkbox"
        id={`modal-${request.movieId}`}
        className="modal-toggle"
      />
      <div className="modal backdrop-blur-md">
        <div className="modal-box relative w-full max-w-2xl shadow-lg shadow-slate-900/75 sm:w-1/2">
          <label
            htmlFor={`modal-${request.movieId}`}
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          {isSuccess && (
            <div className="mt-5 flex items-stretch justify-between gap-5">
              <div className="w-1/3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                  className="rounded-lg object-cover shadow-lg shadow-slate-900"
                  alt={`Poster for ${data?.title}`}
                />
              </div>
              <div className="flex w-2/3 flex-col justify-start gap-3">
                <div className="whitespace-normal">
                  <h3 className="text-left text-xl font-bold ">
                    {request.title}
                  </h3>
                </div>
                <div className="form-control">
                  <label htmlFor="collection">Genre</label>
                  <input
                    type="text"
                    id={`genre-${request.movieId}`}
                    list={`genresFor-${request.movieId}`}
                    className="input input-bordered input-sm"
                    value={form.genre}
                    onChange={(e) => dispatch({ type: 'genre', payload: e.target.value })}
                  />
                  <datalist id={`genresFor-${request.movieId}`}>
                    {data?.genres.map(genre => {
                        return (
                            <option key={genre.name} value={genre.name} />
                        )
                    })}
                  </datalist>
                </div>
                <div className="form-control">
                  <label htmlFor="rtScore">Tomatometer</label>
                  <input
                    type="number"
                    id="rtScore"
                    className="input input-bordered input-sm"
                    value={form.rtScore}
                    onChange={(e) => dispatch({ type: 'rtScore', payload: e.target.value })}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="addedDate">Added Date</label>
                  <input
                    type="date"
                    id="addedDate"
                    className="input input-bordered input-sm"
                    value={form.addedDate?.toJSON().split('T')[0]}
                    onChange={(e) => dispatch({type: 'addedDate', payload: e.target.value})}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="collection">Collection</label>
                  <input
                    type="text"
                    id="collection"
                    className="input input-bordered input-sm"
                    value={form.collection}
                    onChange={(e) => dispatch({ type: 'collection', payload: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
            <button type="button" className={`btn btn-primary mt-5 w-full ${submitState === 'loading' && 'loading'}`} onClick={() => submit()}>
                {submitState === 'loading' ?
                '' : submitState === 'error' ? 'X' :
                    'Add'
                }
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConvertRequestModal;
