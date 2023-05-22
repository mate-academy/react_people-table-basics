import './App.scss';
import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import {
  FC, useCallback, useEffect, useState,
} from 'react';
import classNames from 'classnames';
import { getPeople } from './api';
import { Person } from './types';
import { PeopleTable } from './components/PeopleTable';
import { Loader } from './components/Loader';

interface Props {
  to: string;
  text: string;
}

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    })}
  >
    {text}
  </NavLink>
);

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getPeopleFromServer = useCallback(async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, [getPeopleFromServer]);

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
            <PageNavLink to="/" text="Home" />

            <PageNavLink to="people" text="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="people/:slug"
              element={<PeopleTable people={people} />}
            />

            <Route
              path="/people"
              element={<h1 className="title">People Page</h1>}
            />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>

          <div className="block">
            <div className="box table-container">

              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>

              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>

              {people.length < 1 ? <Loader /> : <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
