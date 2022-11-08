import React, { useState } from "react";
import { TMDBSearchTV } from "../types/tmdb.types";
import { trpc } from "../utils/trpc";

const TVRequestModal: React.FC<{
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  tv: TMDBSearchTV;
}> = ({ tv }) => {
  const [needsProviders, setNeedsProviders] = useState(false);
  const [comments, setComments] = useState('');
  const [requested, setRequested] = useState(tv.requested);
  const {
    data: providers,
    isSuccess,
    isLoading,
  } = trpc.tv.getStreamingInfo.useQuery(
    { id: tv.id },
    {
      enabled: needsProviders,
    }
  );

  const requestTV = trpc.requests.submitTVRequest.useMutation({
    onSuccess: () => {
      setRequested(true);
    },
  });

  const submitRequest = () => {
    requestTV.mutate({
      comments: comments.length ? comments : undefined,
      name: tv.name,
      originalAir: parseInt(tv.first_air_date.substring(0,4), 10),
      tvId: tv.id,
    })
  }

  return (
    <div>
      <label
        htmlFor={`modal-${tv.id}`}
        className="modal-button btn bg-transparent border-none hover:bg-transparent h-full py-2"
        onClick={() => setNeedsProviders(!tv.inCatalogue ?? true)}
      > {tv.poster_path ?
        <img
        className="w-40 rounded-lg shadow-lg shadow-slate-900"
        src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
        alt={`Poster for ${tv.name}`}
      /> : <span className='w-40'>{tv.name}</span>
        }
      </label>
      <input
        type="checkbox"
        id={`modal-${tv.id}`}
        className="modal-toggle"
      />
      <div className={`modal backdrop-blur-md`}>
        <div className="modal-box relative w-full max-w-2xl shadow-lg shadow-slate-900/75 sm:w-1/2">
          <label
            htmlFor={`modal-${tv.id}`}
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            x
          </label>
          <div className="flex gap-5">
            <div className="w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                className="rounded-lg object-cover shadow-lg shadow-slate-900"
                alt={`Poster for ${tv.name}`}
              />
            </div>
            <div className="flex w-2/3 flex-col justify-start gap-5">
              <div className="whitespace-normal">
                <h3 className="text-left text-xl font-bold ">{tv.name}</h3>
              </div>
              <p className="whitespace-pre-wrap text-left">{tv.overview}</p>
              {tv.inCatalogue && (
                <p className="btn btn-outline">Already in Catalogue</p>
              )}
              {!tv.inCatalogue && (
                <>
                {requested ?
                  <p className="btn btn-outline">Requested!</p>
                : 
                  <>
                    <textarea className='textarea textarea-bordered' placeholder='Put any comments about the request here' onChange={(e) => setComments(e.target.value)}></textarea>
                    <button type='button' className='btn btn-primary' onClick={() => submitRequest()}>Request Show</button>
                  </>
                }
                </>
              )}
            </div>
          </div>
          {!tv.inCatalogue && isSuccess && !isLoading && (
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

export default TVRequestModal;
