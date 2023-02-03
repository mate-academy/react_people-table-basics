/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import {
  Navigate, NavLink, Route, Routes,
} from 'react-router-dom';
import cn from 'classnames';
import { getPeople } from './api';

import './App.scss';
import { Person } from './types/Person';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleFromServer = async () => {
    try {
      const dataFromServer = await getPeople();

      const peopleWithParents = dataFromServer.map((person: Person) => {
        return {
          ...person,
          mother: dataFromServer.find(
            (p: Person) => p.name === person.motherName,
          ),
          father: dataFromServer.find(
            (p: Person) => p.name === person.fatherName,
          ),
        };
      });

      setPeople(peopleWithParents);
    } catch {
      (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

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
            <NavLink
              className={({ isActive }) => cn('navbar-item ',
                { 'has-background-grey-lighter': isActive })}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => cn('navbar-item ',
                { 'has-background-grey-lighter': isActive })}
              to="/people"
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

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

            <Route path="/people">
              <Route
                index
                element={<PeoplePage people={people} />}
              />
              <Route
                path=":personSlug"
                element={<PeoplePage people={people} />}
              />
            </Route>

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
