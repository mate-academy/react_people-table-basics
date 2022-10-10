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

export const App = () => {
  const [onLoad, setOnLoad] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [peopleLength, setPeopleLength] = useState(0);

  const warning = onLoad && setServerError && peopleLength === 0

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />

            <Route
              path="people/"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <PeopleList
                    setOnLoad={setOnLoad}
                    setServerError={setServerError}
                    setPeopleLength={setPeopleLength}
                  />
                </>
              )}
            >
              <Route
                index
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleList
                      setOnLoad={setOnLoad}
                      setServerError={setServerError}
                      setPeopleLength={setPeopleLength}
                    />
                  </>
                )}
              />
              <Route
                path=":personSlug"
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleList
                      setOnLoad={setOnLoad}
                      setServerError={setServerError}
                      setPeopleLength={setPeopleLength}
                    />
                  </>
                )}
              />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
          </Routes>

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
        </div>
      </main>
    </div>
  );
};
