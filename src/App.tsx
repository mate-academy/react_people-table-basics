import { useEffect, useState } from 'react';
import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Person } from './types';
import { getPeople } from './api';
import { PeoplePage } from './components/PeoplePage';

export const App: React.FC = () => {
  const [selectedNavLink, setSelectedNavLink] = useState('People');
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);

  const resetPeopleFromServer = async () => {
    setPeopleFromServer([]);
  };

  const fetchPeopleFromServer = async () => {
    setPeopleFromServer([]);
    const people: Person[] = await getPeople();

    setPeopleFromServer(people);
  };

  const selectedLinkHandler = (navPage: string) => {
    setSelectedNavLink(navPage);
  };

  useEffect(() => {
    if (selectedNavLink === 'People') {
      fetchPeopleFromServer();
    }
  }, [selectedNavLink]);

  return (
    <div data-cy="app">
      <Navigation
        selectedLinkHandler={selectedLinkHandler}
        resetPeopleFromServer={resetPeopleFromServer}
      />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="title">Home Page</h1>
              }
            />
            <Route path="people">
              <Route
                index
                element={(
                  <PeoplePage
                    people={peopleFromServer}
                  />
                )}
              />
              <Route
                path=":personSlag"
                element={(
                  <PeoplePage
                    people={peopleFromServer}
                  />
                )}
              />
            </Route>

            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>

        </div>
      </main>
    </div>
  );
};
