import './App.scss';
import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import { FC, useState } from 'react';
import classNames from 'classnames';
import { PeopleTable } from './components/PeopleTable';

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
  const [isLoadingError, setIsLoadingError] = useState(false);

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
              element={<PeopleTable setIsLoadingError={setIsLoadingError} />}
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

              {isLoadingError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : <PeopleTable setIsLoadingError={setIsLoadingError} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
