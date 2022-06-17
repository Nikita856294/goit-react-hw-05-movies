import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const MoviesForm = ({ onSubmit }) => {
  const [film, setFilm] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const handleSubmit = e => {
    e.preventDefault();
    setFilm(film);

    setSearchParams({ query: film });
    if (film === '') {
      toast.error('Enter something into input');
    }

    onSubmit(film);
  };

  const handleChange = e => {
    setFilm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default MoviesForm;
