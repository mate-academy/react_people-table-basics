// import { Loader } from './components/Loader';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';

import './App.scss';
import { HomePage } from './Page/HomePage';
import { PeoplePage } from './Page/PeoplePage';
import { PageNotFound } from './Page/PageNotFound';

export const App = () => (
  <div data-cy="app">

    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />

          <Route path="people">
            <Route
              index
              element={<PeoplePage />}
            />

            <Route
              path=":selectedPerson"
              element={
                <PeoplePage />
              }
            />
          </Route>

          <Route
            path="*"
            element={<PageNotFound />}
          />

        </Routes>
      </div>
    </main>
  </div>
);
