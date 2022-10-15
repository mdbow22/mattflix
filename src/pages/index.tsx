import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from 'react';
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {

  // const [omdbData, setOmdbData] = useState<any>();
  // const [omdbLoading, setOmdbLoading] = useState(true);
  // const [isInitialized, setIsInitialized] = useState(false);
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  const { data, isLoading, isSuccess } = trpc.movies.getLatest.useQuery();

  // useEffect(() => {
  //   if(!isInitialized && isSuccess) {
  //     setIsInitialized(true);

  //   }
  // },  [isInitialized, isSuccess])

  return (
    <>
      <Head>
        <title>The Mattflix Catalogue</title>
        <meta name="description" content="The Collection of Movies known as Mattflix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container max-w-5xl mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-red-700 md:text-[5rem]">
          Matt<span className='text-white/95'>flix</span>
        </h1>
        <div className='flex justify-around gap-4'>
          <button type='button' className='rounded bg-white/95 px-3 py-2 text-black/90 hover:bg-white/75 active:scale-95 transition-all'>Browse</button>
          <button type='button' className='rounded border border-white/95 px-3 py-2 hover:text-black/90 hover:bg-white/75 active:scale-95 transition-all'>Request</button>
        </div>
        <div id='recent-adds-table' className='mt-10'>
          <h2 className='text-3xl text-center'>New Additions</h2>
          {!isLoading && isSuccess &&
            <div className='flex gap-5 mt-5 flex-wrap'>
              {data?.map(movie => {
                return (
                  <div key={movie.movieId} className='flex flex-col items-center w-32'>
                    <div>
                      <img src={movie.omdb.poster} className='w-32' alt={`poster for ${movie.title}`} />
                    </div>
                    <div className='text-center mt-3'>
                      {movie.title}
                    </div>
                  </div>
                )
              })}
            </div>
          }
        </div>
        <div id='recent-adds-table' className='mt-10'>
          <h2 className='text-3xl'>Latest Requests</h2>
          
        </div>
      </main>
    </>
  );
};

export default Home;