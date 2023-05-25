import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { PageNavLink } from './components/PageNavLink/PageNavLink';

import './App.scss';

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
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route
              index
              element={(
                <>
                  <h1 className="title">People Page</h1>

                  <PeoplePage />
                </>
              )}
            />

            <Route
              path=":personSlug"
              element={(
                <>
                  <h1 className="title">People Page</h1>

                  <PeoplePage />
                </>
              )}
            />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
