import {
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { getNavLinkClassnames } from './services/getNavLinkClassnames';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

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
          <NavLink className={getNavLinkClassnames} to="/">
            Home
          </NavLink>

          <NavLink
            className={getNavLinkClassnames}
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
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="../" replace />} />
            <Route path="people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);
