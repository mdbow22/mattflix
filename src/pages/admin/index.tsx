import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ConvertRequestModal from '../../components/ConvertRequestModal';
import Loader from '../../components/Loader';
import { trpc } from '../../utils/trpc';

const AdminDashboard: NextPage = () => {
  const { data: session, status } = useSession();

  const [movieRequests, setMovieRequests] = useState(true);
  const [selectedMovies, setSelectedMovies] = useState<any>();
  const [selectedTV, setSelectedTV] = useState<any>();

  const { data, isLoading } = trpc.requests.getAllRequests.useQuery();

  if (
    (status !== "authenticated" ||
      session.user?.id !== "clabcwfmw0000xmr904r2333f") &&
    status !== "loading"
  ) {
    return (
      <div className="container mx-auto mt-10 max-w-6xl text-4xl">
        Unauthorized Access
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <h1 className="my-10 text-4xl font-bold text-primary">Admin Dashboard</h1>
      <h3 className="text-2xl">Pending Requests</h3>
      <div className="tabs my-5 inline-block">
        <button
          className={`tab tab-bordered ${
            movieRequests && "tab-active"
          } text-lg`}
          onClick={() => setMovieRequests(true)}
        >
          Movies
        </button>
        <button
          className={`tab tab-bordered ${
            !movieRequests && "tab-active"
          } text-lg`}
          onClick={() => setMovieRequests(false)}
        >
          TV Shows
        </button>
      </div>
      <div className="w-full border border-secondary/50 shadow shadow-secondary rounded-lg">
        {isLoading &&
            <div className='text-center h-72 flex items-center w-full justify-center'>
            <Loader />
            </div>
        }
        {!isLoading &&
        <>
            <div className="header mt-2 pb-2 grid grid-cols-12 w-full align-middle font-bold text-lg uppercase border-b border-secondary/25">
              <div className="flex items-center col-span-2 pl-5">
                <label className="flex items-center">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                </label>
              </div>
              <div className='col-span-6'>Title</div>
              <div className="col-span-2 text-center">Year</div>
              <div className="col-span-2 text-center">Added</div>
            </div>
            <div className="body w-full h-72 overflow-y-auto mb-5">
                {movieRequests && data?.movieRequests.map(movie => {
                    return (
                        <div className='py-1 grid grid-cols-12 items-center w-full hover:bg-secondary/25' key={movie.movieId}>
                            <div className="flex items-center col-span-2 pl-5">
                                <label className="flex items-center">
                                <input type="checkbox" className="checkbox checkbox-sm" />
                                </label>
                            </div>
                            <div className='col-span-6'>
                                <ConvertRequestModal request={movie} />
                            </div>
                            <div className='col-span-2 text-center'>
                                {movie.year}
                            </div>
                            <div className='col-span-2 text-center'>
                                {movie.addedDate.toLocaleDateString()}
                            </div>
                        </div>
                    )
                })
                }
                {!movieRequests && data?.tvRequests.map(tv => {
                    return (
                        <div className='py-1 grid grid-cols-12 items-center w-full hover:bg-secondary/25' key={tv.tvId}>
                            <div className="flex items-center col-span-2 pl-5">
                                <label className="flex items-center">
                                <input type="checkbox" className="checkbox checkbox-sm" />
                                </label>
                            </div>
                            <div className='col-span-6'>
                                {tv.name}
                            </div>
                            <div className='col-span-2 text-center'>
                                {tv.originalAir}
                            </div>
                            <div className='col-span-2 text-center'>
                                {tv.addedDate.toLocaleDateString()}
                            </div>
                        </div>
                    )
                })

                }
            </div>
            </>
            }
            
          </div>
          <div className='mt-5'>
            Total: {movieRequests ? data?.movieRequests.length : data?.tvRequests.length}
          </div>
            
      {/* <div className='flex w-full'>
        <div className='flex-grow'>
          <h3 className="text-2xl">Pending Requests - Film</h3>
          <div className="w-full">
            <div className="header mt-5 flex w-full flex-nowrap items-center justify-between">
              <div className="flex items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                </label>
              </div>
              <div className="w-1/2">Title</div>
              <div className="">Year</div>
              <div className="">Added Date</div>
            </div>
            <div className="body grid grid-cols-4"></div>
          </div>
        </div>
        <div className='divider divider-horizontal' />
        <div className='flex-grow'>
          <h3 className="text-2xl">Pending Requests - TV</h3>
          <div className="w-full">
            <div className="header mt-5 flex w-full flex-nowrap items-center justify-between">
              <div className="flex items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                </label>
              </div>
              <div className="w-1/2">Title</div>
              <div className="">Year</div>
              <div className="">Added Date</div>
            </div>
            <div className="body grid grid-cols-4"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
