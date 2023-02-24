import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { NavItem } from './components/NavItem';
import { People } from './pages/People';

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
          <NavItem
            to="/"
            title="Home"
          />

          <NavItem
            to="/people"
            title="People"
          />
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />
          <Route path="/people">
            <Route index element={<People />} />
            <Route
              path=":personSlug"
              element={<People />}
            />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
