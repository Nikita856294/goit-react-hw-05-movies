import { useEffect, useState } from 'react';
import { requestTrendingFilms } from '../../services/API';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import '../../css/Homepage.modules.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Homepage = () => {
  const [films, setFilms] = useState([]);
  const [status, setStatus] = useState('idle');

  async function trendingFilms() {
    setStatus('pending');
    try {
      const film = await requestTrendingFilms();
      setStatus('resolved');
      setFilms(film);
    } catch {
      setStatus('rejected');
    }
    setStatus('resolved');
  }

  useEffect(() => {
    trendingFilms();
  }, []);

  if (status === 'pending') {
    <TailSpin height="100" width="100" />;
  }
  if (status === 'rejected') {
    alert('Whoops, something went wrong');
  }
  if (status === 'resolved') {
    return (
      <div className="home-section">
        <h3 className="home-title">Trending todays</h3>
        <ul className="home-list">
          {films.map(film => {
            return (
              <li key={film.id} className="home-item">
                <Link to={`movies/${film.id}`} className="home-link">
                  {film.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Homepage;
