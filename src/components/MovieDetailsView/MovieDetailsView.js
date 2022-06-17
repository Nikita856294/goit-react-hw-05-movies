import { useState, useEffect } from 'react';
import { requestMovieDetails } from 'services/API';
import { Link, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Cast from 'components/Cast';
import Reviews from 'components/Reviews';
import { TailSpin } from 'react-loader-spinner';
import ImgPath from 'services/ImgPath';

const MovieDetailsView = () => {
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    async function MovieDetails() {
      setStatus('pending');
      try {
        const movie = await requestMovieDetails(movieId);

        setMovie(movie);
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
      setStatus('resolved');
    }
    MovieDetails();
  }, [movieId]);
  if (status === 'pending') {
    return <TailSpin />;
  }
  if (status === 'rejected') {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <>
        <div>
          {movie.poster_path && (
            <img src={`${ImgPath}${movie.poster_path}`} alt={movie.overview} />
          )}
          <h2>{movie.title}</h2>
          <p>{new Date(movie.release_date).getFullYear().toString()}</p>
          <p>Use Score:{Math.round(movie.popularity)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres &&
              movie.genres.map(genre => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
          </ul>
        </div>

        <div>
          <h4>Additional information</h4>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </div>
      </>
      <Routes>
        <Route path="/cast" element={<Cast movieId={movieId} />} />
        <Route path="/reviews" element={<Reviews movieId={movieId} />} />
      </Routes>
    </>
  );
};

export default MovieDetailsView;
