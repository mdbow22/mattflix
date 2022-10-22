import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Loader from "../components/Loader";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading, isSuccess } = trpc.movies.getLatest.useQuery();
  const {
    data: requests,
    isLoading: requestsLoading,
    isSuccess: requestSuccess,
  } = trpc.requests.getNewest.useQuery();

  return (
    <>
      <Head>
        <title>The Mattflix Catalogue</title>
        <meta
          name="description"
          content="The Collection of Movies known as Mattflix"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen max-w-5xl flex-col items-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-primary  md:text-[5rem]">
          Mattflix
        </h1>
        <div className="flex justify-around gap-4">
          <Link href="/browse">
            <button
              type="button"
              className="btn btn-primary"
              //className="rounded bg-white/95 px-3 py-2 text-black/90 transition-all hover:bg-white/75 active:scale-95"
            >
              Browse
            </button>
          </Link>
          <Link href="/request">
            <button
              type="button"
              className="btn btn-outline"
              //className="rounded border border-white/95 px-3 py-2 transition-all hover:bg-white/75 hover:text-black/90 active:scale-95"
            >
              Request
            </button>
          </Link>
        </div>
        <div id="recent-adds-table" className="mt-10">
          <h2 className="text-center text-3xl">New Additions</h2>
          {isLoading && <Loader />}
          {!isLoading && isSuccess && (
            <div className="mt-5 flex flex-wrap items-start justify-around gap-5">
              {data?.map((movie) => {
                return (
                  <div
                    key={movie.movieId}
                    className="flex w-32 flex-col items-center"
                  >
                    <div>
                      <img
                        src={movie.omdb.poster}
                        className="w-32"
                        alt={`poster for ${movie.title}`}
                      />
                    </div>
                    <div className="mt-3 text-center">{movie.title}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div id="recent-adds-table" className="mt-10">
          <h2 className="text-3xl">Latest Requests</h2>
          {!requestsLoading && requestSuccess && (
            <div className="mt-5 flex flex-wrap justify-around gap-5">
              {requests?.map((request, i) => {
                return (
                  <div
                    key={`request-${request.movieId}`}
                    className="swap-off flex w-32 flex-col items-center"
                    tabIndex={i}
                  >
                    <div>
                      <img
                        src={request.omdb.poster}
                        className="h-52 object-cover"
                        alt={`poster for ${request.title}`}
                      />
                    </div>
                    <div className="mt-3 text-center">{request.title}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className=" mt-auto text-center">
          <p>
            Plots, Pictures, and Casting Info provided by{" "}
            <a
              className="link"
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noreferrer"
            >
              The Movie Database
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
