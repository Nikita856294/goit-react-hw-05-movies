import { useState, useEffect } from 'react';
import { requestMovieDetails } from 'services/API';
import { Link, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Cast from 'components/Cast';
import Reviews from 'components/Reviews';
import { TailSpin } from 'react-loader-spinner';
import ImgPath from 'services/ImgPath';
import '../../css/MovieDetailsView.modules.css';

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
        <div className="movie-section">
          {movie.poster_path && (
            <img
              src={`${ImgPath}${movie.poster_path}`}
              alt={movie.overview}
              width="200"
              height="100"
              className="movie-img"
            />
          )}
          <div className="movie-date">
            <h2 className="movie-title">
              {movie.title}
              <p className="movie-release">
                ({new Date(movie.release_date).getFullYear().toString()})
              </p>
            </h2>
          </div>
          <p className="movie-popularity">
            Use Score:{Math.round(movie.popularity)}%
          </p>
          <h3 className="overview-title">Overview</h3>
          <p className="overview-text">{movie.overview}</p>
          <h3 className="genres">Genres</h3>
          <ul className="genres-list">
            {movie.genres &&
              movie.genres.map(genre => {
                return (
                  <li key={genre.id} className="genres-item">
                    {genre.name}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="line"> </div>
        <div className="additional">
          <h4 className="additional-title">Additional information</h4>
          <ul className="additional-list">
            <li className="additional-item">
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
