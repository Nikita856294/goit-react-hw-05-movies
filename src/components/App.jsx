import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import MoviesPage from './MoviesPage';
import Navigation from './Navigation';
import MovieDetailsView from './MovieDetailsView';
import Container from './Container';
import GlobalStyle from './GlobalStyle';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />

      <Container>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId/*" element={<MovieDetailsView />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </Container>
    </>
  );
};
