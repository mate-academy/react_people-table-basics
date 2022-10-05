import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getPeople } from './api';

import './App.scss';
import { Navigation } from './components/Loader/pages/Navigation';
import { PeopleList } from './components/Loader/pages/PeopleList';
import { Person } from './types';

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadPeople = () => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeopleList
                    people={people}
                    errorMessage={errorMessage}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeopleList
                    people={people}
                    errorMessage={errorMessage}
                  />
                )}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
