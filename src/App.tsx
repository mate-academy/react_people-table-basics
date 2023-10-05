import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/People/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Navbar />
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route path="people">
            <Route
              index
              element={(
                <PeoplePage />
              )}
            />
            <Route
              path=":slug"
              element={(
                <PeoplePage />
              )}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
