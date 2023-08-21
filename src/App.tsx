import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.scss';
import { Navigation } from './components/Navigation/Navigation';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { Person } from './types';
import { getPeople } from './api';
import { MessageMenu } from './components/MessageMenu/MessageMenu';

export const App: React.FC = () => {
  const [person, setPerson] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then((people) => {
        setPerson(people);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [setPerson, setIsLoading]);

  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="people">
              <Route
                index
                element={<PeopleTable person={person} isLoading={isLoading} />}
              />
              <Route
                path="/people/:slug"
                element={<PeopleTable person={person} isLoading={isLoading} />}
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
          {!isLoading && (
            <MessageMenu
              person={person}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </main>
    </div>
  );
};
