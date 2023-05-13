import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './App.scss';

import {
  NavLink, Routes, Route, Navigate,
} from 'react-router-dom';
import { Loader } from './components/Loader';
import { Person } from './types/Person';
import { getPeople } from './api';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: React.FC<Props> = ({ to, text }) => {
  return (
    <>
      <NavLink
        className={({ isActive }) => classNames(
          'navbar-item',
          { 'has-background-grey-lighter': isActive },
        )}
        to={to}
      >
        {text}
      </NavLink>
    </>
  );
};

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getpeople = async () => {
    const fetchPeople = await getPeople();

    setIsLoading(true);

    try {
      setPeople(fetchPeople);
    } catch {
      setIsLoading(false);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getpeople();
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
            <PageNavLink to="/" text="Home Page" />

            <PageNavLink to="/people" text="People Page" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <div className="block">
            <div className="box table-container">
              {isLoading
                ? <Loader />
                : (
                  <Routes>
                    <Route
                      path="*"
                      element={
                        <h1 className="title">Page not found</h1>
                      }
                    />
                    <Route path="home" element={<Navigate to="/" replace />} />
                    <Route
                      path="/"
                      element={
                        <h1 className="title">Home Page</h1>
                      }
                    />

                    <Route path="people">
                      <Route
                        index
                        element={
                          <PeoplePage people={people} error={error} />
                        }
                      />
                      <Route
                        path=":slug"
                        element={
                          <PeoplePage people={people} error={error} />
                        }
                      />
                    </Route>
                  </Routes>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
