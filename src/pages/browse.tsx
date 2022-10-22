import { NextPage } from 'next';
import MoreInfoModal from '../components/MoreInfoModal';
import { trpc } from '../utils/trpc';

const Browse: NextPage = () => {

    const { data, isLoading, isSuccess } = trpc.movies.getAll.useQuery();

  return (
    <div className='container max-w-5xl mt-10 mx-auto'>
        <h1 className='text-4xl'>Catalogue</h1>
        <table className='table table-zebra mt-10 w-full'>
            <caption className='text-left mb-3' style={{captionSide: 'top'}}>
                Total Movies: {data?.length}
            </caption>
            <thead>
                <tr className='text-center'>
                    <th>&nbsp;</th>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Release Year</th>
                    <th>Tomatometer</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                {!isLoading && isSuccess &&
                    <>
                    {data.map((movie, i) => {
                        return (
                            <tr key={movie.movieId}>
                                <td className='text-center'>{i + 1}</td>
                                <td className='text-center'>{movie.title}</td>
                                <td className='text-center'>{movie.Directors.name}</td>
                                <td className='text-center'>{movie.releaseYear}</td>
                                <td className='text-center'>{movie.rtScore}%</td>
                                <td className='text-center'>
                                    {/* <button type='button' className='btn btn-xs btn-secondary'>More Info</button> */}
                                    <MoreInfoModal movie={movie} />
                                </td>
                            </tr>
                        )
                    })}
                    </>
                }
            </tbody>
            <tfoot>

            </tfoot>
        </table>
    </div>
  )
}

export default Browse;