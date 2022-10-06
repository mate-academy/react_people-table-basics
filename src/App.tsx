import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { PageNavLink } from './components/PageNavLink/PageNavLink';
import { HomePage } from './components/pages/HomePage/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/pages/PeoplePage/PeoplePage';

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
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>

        </Routes>

      </div>
    </main>
  </div>
);
