import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import Navigation from './Navigation';
import Container from './Container';
import GlobalStyle from './GlobalStyle';
import { ToastContainer } from 'react-toastify';

const Homepage = lazy(() => import('./Homepage'));
const MoviesPage = lazy(() => import('./MoviesPage'));
const MovieDetailsView = lazy(() => import('./MovieDetailsView'));

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />

      <Container>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<TailSpin />}>
                <Homepage />
              </Suspense>
            }
          />

          <Route
            path="movies"
            element={
              <Suspense fallback={<TailSpin />}>
                <MoviesPage />
              </Suspense>
            }
          />

          <Route
            path="movies/:movieId/*"
            element={
              <Suspense fallback={<TailSpin />}>
                <MovieDetailsView />
              </Suspense>
            }
          />

          <Route path="*" element={<Homepage />} />
        </Routes>
      </Container>
    </>
  );
};
