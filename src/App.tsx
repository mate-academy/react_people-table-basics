import './App.scss';
import {
  Navigate, NavLink, Route, Routes, useParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { PeopleTable } from './pages/PeopleTable';
import { getPeople } from './api';
import { Person } from './types';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={
      ({ isActive }) => (
        classNames('navbar-item',
          { 'has-background-grey-lighter': isActive }))
    }
  >
    {text}
  </NavLink>
);

export const People = () => {
  const { slug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadTodosUser = async () => {
      try {
        setIsLoading(true);
        const loadPeople = await getPeople();

        if (loadPeople !== undefined) {
          setPeople(loadPeople);
        }

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    loadTodosUser();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {!isError
        ? (
          <>
            {people.length === 0 && isLoading === false
              ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )
              : (
                <PeopleTable
                  people={people}
                  isLoading={isLoading}
                  selectedPerson={slug}
                />
              )}
          </>
        )
        : (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
    </>
  );
};

export const App = () => (
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
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people/:slug" element={<People />} />
          <Route path="people" element={<People />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
