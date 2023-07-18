import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isSelected, setIsSelected] = useState<string | null>('');
  const [isLoader, setIsLoader] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res);
        setIsLoader(false);
      }).catch(() => {
        setError('Something went wrong');
      });
  }, [people]);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Navbar to="/" page="Home" />
            <Navbar to="/people" page="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={(
                <PeoplePage
                  people={people}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                  error={error}
                  isLoader={isLoader}
                />
              )}
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
