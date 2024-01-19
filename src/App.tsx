import cn from 'classnames';
import './App.scss';
import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from './components/HomePage';
import { NotFound } from './components/NotFound';
import { PeoplePage } from './components/PeoplePage';
import { Person } from './types/Person';
import { getPeople } from './api';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  // const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
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
              className={({ isActive }) => cn('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) => cn('navbar-item',
                { 'has-background-grey-lighter': isActive })}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route
                index
                element={(
                  <PeoplePage
                    people={people}
                    loading={loading}
                    isError={isError}
                  />
                )}
              />
              <Route
                path=":slug"
                element={(
                  <PeoplePage
                    people={people}
                    loading={loading}
                    isError={isError}
                  />
                )}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
