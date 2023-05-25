import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { NavigationLink } from './components/NavigationLink';
import { PageNotFound } from './components/PageNotFound';
import { PeoplePage } from './components/PeoplePage';

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
            <NavigationLink to="/" title="Home" />

            <NavigationLink to="/people" title="People" />
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>

            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="*"
              element={<PageNotFound />}
            />

          </Routes>
        </div>
      </main>
    </div>
  );
};
