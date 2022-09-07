import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleTable } from './components/PeopleTable';
import { HomePage } from './components/HomePage';
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
      .then(person => {
        if (person.length > 0) {
          setPeople(person);
        }

        setError('There are no people on the server');
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
              element={<PeopleTable people={people} error={error} />}
            />
            <Route
              path="people/:slug"
              element={<PeopleTable people={people} error={error} />}
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
