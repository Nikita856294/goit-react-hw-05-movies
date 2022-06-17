import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../css/MoviesForm.modules.css';

const MoviesForm = ({ onSubmit }) => {
  const [film, setFilm] = useState('');
  // eslint-disable-next-line no-unused-vars
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
    <form onSubmit={handleSubmit} className="form">
      <input onChange={handleChange} />
      <button type="submit" className="form-button">
        Search
      </button>
    </form>
  );
};

export default MoviesForm;
