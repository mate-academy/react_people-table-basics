import './App.scss';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';

const getNavActiveClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const App = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => setLoader(false));
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
            <NavLink className={getNavActiveClass} to="/">
              Home
            </NavLink>

            <NavLink className={getNavActiveClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Outlet context={{ errorMessage, people, loader }} />
        </div>
      </main>
    </div>
  );
};
