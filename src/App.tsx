import { useEffect, useState } from 'react';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import cn from 'classnames';
import { Person } from './types';
import { getPeople } from './api';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  })
);

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              to="/"
              className={getLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={getLinkClass}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="people">
            <Route
              path=":slugId?"
              element={(
                <PeoplePage
                  people={people}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                />
              )}
            />
          </Route>

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </main>
    </div>
  );
};
