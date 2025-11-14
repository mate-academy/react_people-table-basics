import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import { HomePage } from '../features/home';
import { PeoplePage } from '../features/people';
import { NotFoundPage } from '../features/not-found';
import { getNavLinkClass } from '../shared/lib/getNavLinkClass';

export const App: React.FC = () => {
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
            <NavLink to="/" className={getNavLinkClass} end>
              Home
            </NavLink>

            <NavLink to="/people" className={getNavLinkClass}>
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
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
