import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useState } from 'react';

import { Loader } from './components/Loader';
import PeopleList from './components/PeopleList';
import Navigation from './components/Navigation';

import './App.scss';
import { Home } from './pages/Home/Home';
import { PeoplPage } from './pages/People/PeoplePage';

export const App = () => {
  const [onLoad, setOnLoad] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [peopleLength, setPeopleLength] = useState(1);

  const warning = onLoad || serverError || peopleLength === 0;

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="people"
              element={ <PeoplPage /> }
            />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
          </Routes>

          {warning
            && (
              <div className="block">
                <div className="box table-container">
                  {onLoad && <Loader />}

                  {serverError
                    && (
                      <p data-cy="peopleLoadingError" className="has-text-danger">
                        Something went wrong
                      </p>
                    )}
                  {peopleLength === 0
                    && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};
