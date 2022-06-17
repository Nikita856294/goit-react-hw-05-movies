import { useState, useEffect } from 'react';
import { requestMovieCredits } from 'services/API';
import { TailSpin } from 'react-loader-spinner';

import ImgPath from 'services/ImgPath';

const Cast = ({ movieId }) => {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    async function MovieCredit() {
      setStatus('pending');
      try {
        const actors = await requestMovieCredits(movieId);
        setActors(actors);
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
      setStatus('resolved');
    }
    MovieCredit();
  }, [movieId]);
  if (status === 'pending') {
    return <TailSpin />;
  }

  if (status === 'rejected') {
    return <p>{error.message}</p>;
  }

  return (
    <ul>
      {status === 'resolved' &&
        actors.map(actor => {
          return (
            <li key={actor.cast_id}>
              {actor.profile_path && (
                <img src={`${ImgPath}${actor.profile_path}`} alt={actor.name} />
              )}

              <p>{actor.original_name}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default Cast;
