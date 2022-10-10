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

type ServerState = 'Loading' | 'Empty' | 'Fail' | '';

export const App = () => {
  const [onLoad, setOnLoad] = useState(true);

  const catchServerState = (state: ServerState) => {
    switch (state) {
      case 'Loading':
        <Loader />;
        break;
      case '':
        <div>1</div>;
        break;
      default:
    }
  };

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
                  <PeopleList catchServerState={catchServerState} />
                </>
              )}
            >
              <Route
                index
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleList catchServerState={catchServerState} />
                  </>
                )}
              />
              <Route
                path=":personSlug"
                element={(
                  <>
                    <h1 className="title">People Page</h1>
                    <PeopleList catchServerState={catchServerState} />
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

              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>

              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
