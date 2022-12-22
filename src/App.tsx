import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { PageNavLink } from './components/PageNavLink';

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
          <PageNavLink to="/people" text="People" />
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            index
            element={<h1 className="title">Home Page</h1>}
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />

          <Route path="/people">
            <Route
              index
              element={<PeoplePage />}
            />

            <Route
              path=":slug"
              element={<PeoplePage />}
            />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
