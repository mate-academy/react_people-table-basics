import {
  FC,
  useEffect,
  useState,
} from 'react';

import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useMatch,
} from 'react-router-dom';

import cn from 'classnames';

import './App.scss';

import { PeopleTable } from './components/PeopleTable';

export const App: FC = () => {
  const [selectedSlug, setSelectedSlug] = useState('');

  const handlePersonClick = (slug: string) => {
    setSelectedSlug(slug);
  };

  const match = useMatch('/people/:selectedSlug');

  useEffect(() => {
    setSelectedSlug(match?.params.selectedSlug || '');
  }, [match]);

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
              className={({ isActive }) => (
                cn(
                  'navbar-item',
                  {
                    'has-background-grey-lighter': isActive,
                  },
                )
              )}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) => (
                cn(
                  'navbar-item',
                  {
                    'has-background-grey-lighter': isActive,
                  },
                )
              )}
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
              element={
                <h1 className="title">Home Page</h1>
              }
            />

            <Route
              path="/home"
              element={
                <Navigate to="/" replace />
              }
            />

            <Route
              path="/people"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <div className="block">
                    <div className="box table-container">
                      <PeopleTable
                        handlePersonClick={handlePersonClick}
                        selectedSlug={selectedSlug}
                      />
                    </div>
                  </div>
                </>
              )}
            />

            <Route
              path="/people/:selectedSlug"
              element={(
                <>
                  <h1 className="title">People Page</h1>
                  <div className="block">
                    <div className="box table-container">
                      <PeopleTable
                        handlePersonClick={handlePersonClick}
                        selectedSlug={selectedSlug}
                      />
                    </div>
                  </div>
                </>
              )}
            />

            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
