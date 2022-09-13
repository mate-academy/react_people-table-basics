/* eslint-disable */
import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { Navbar } from './components/Navbar';
import { Person } from './types';
import './App.scss';
import { getPeople } from './api';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    navigate('./');
  }, []);

  const handlePeopleSave = async () => {
    await getPeople()
      .then(people => {
        people.length > 0
          ? setPeople(people)
          : setError('There are no people on the server');
      })
      .catch(() => setError('Something went wrong'));
  };

  return (
    <div data-cy="app">
      <Navbar onPeopleSave={handlePeopleSave} />

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
            <Route
              path="people"
              element={(
                <PeoplePage
                  people={people}
                  error={error}
                />
              )}
            />
            <Route
              path="people/:slug"
              element={(
                <PeoplePage
                  people={people}
                  error={error}
                />
              )}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
