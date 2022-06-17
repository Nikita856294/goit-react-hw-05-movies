import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '553dbf56094ae628f1a56828e9f90068';

const SearchFilm = async query => {
  const response = await axios.get(
    `search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
  );
  return response.data.results;
};

const requestTrendingFilms = async () => {
  const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
  console.log(response);
  return response.data.results;
};

const requestMovieDetails = async movieId => {
  const response = await axios.get(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

const requestMovieCredits = async movieID => {
  const response = await axios.get(
    `movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`
  );

  return response.data.cast;
};

const requestReviews = async movieID => {
  const response = await axios.get(
    `movie/${movieID}/reviews?api_key=${API_KEY}&language=en-US`
  );
  console.log(response);
  return response.data.results;
};
const genresRequest = async () => {
  const response = await axios.get(
    `genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  return response.data.results;
};

export {
  SearchFilm,
  requestTrendingFilms,
  requestMovieDetails,
  requestMovieCredits,
  requestReviews,
  genresRequest,
};
