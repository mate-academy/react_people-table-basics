import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PageNavLink } from './components/PageNavLink';

export const App = () => {
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
            <PageNavLink
              to="/"
              text="Home"
            />

            <PageNavLink
              to="people"
              text="People"
            />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<NotFoundPage />}
            />

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="people"
              element={<PeoplePage />}
            >
              <Route
                path=":selectedPerson"
                element={<PeoplePage />}
              />

              <Route
                index
                element={<PeoplePage />}
              />
            </Route>

            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
