import './App.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { PeoplePage } from './pages/PeoplePage';
import { useContext } from 'react';
import { PeopleContext } from './stores/PeopleProvider';

const isActiveClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const App = () => {
  const location = useLocation();
  const { errorMessage } = useContext(PeopleContext);
  return (
    <>
      {errorMessage ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      ) : (
        <div data-cy="app">
          <nav
            data-cy="nav"
            className="navbar is-fixed-top has-shadow"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="container">
              <div className="navbar-brand">
                <NavLink className={isActiveClass} to="/">
                  Home
                </NavLink>

                <NavLink className={isActiveClass} to="people">
                  People
                </NavLink>
              </div>
            </div>
          </nav>

          <main className="section">
            <div className="container">
              <Outlet />

              <div className="block">
                <div className="box table-container">
                  {location.pathname === 'people' && <PeoplePage />}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};
