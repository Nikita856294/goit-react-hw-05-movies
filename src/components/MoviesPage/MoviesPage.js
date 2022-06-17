import { useState, useEffect } from 'react';
import MoviesForm from 'components/MoviesForm';
import { Link } from 'react-router-dom';
import { SearchFilm } from 'services/API';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

const MoviesPage = () => {
  const [film, setFilm] = useState('');
  const [films, setFilms] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (film === '') {
      return;
    }
    async function request() {
      setStatus('pending');
      try {
        const films = await SearchFilm(film);
        if (films.length === 0) {
          setStatus('resolved');
          return toast.error('Enter the correct value in the field');
        }
        setFilms(films);
      } catch (error) {
        setStatus('rejected');
      }
      setStatus('resolved');
    }
    request();
  }, [film]);

  const handleSubmit = film => {
    console.log(film);
    setFilm(film);
  };

  if (status === 'pending') {
    return <TailSpin />;
  }
  if (status === 'rejected') {
    return toast.error(' Something went wrong');
  }

  return (
    <>
      <MoviesForm onSubmit={handleSubmit} />
      <ul>
        {status === 'resolved' &&
          films.map(film => {
            return (
              <li key={film.id}>
                <Link to={`${film.id}`}>{film.title}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MoviesPage;
