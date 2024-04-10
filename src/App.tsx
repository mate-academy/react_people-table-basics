import { NavLink, Routes, Route } from 'react-router-dom';
import { Content } from './components/Content';

import './App.scss';
import { Home } from './components/Home';
import { People } from './components/People';

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
          <NavLink className="navbar-item" to="/">
            Home
          </NavLink>

          <NavLink
            className="navbar-item has-background-grey-lighter"
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
          <Route path="/" element={<Content />}>
            <Route index element={<Home />} />
            <Route path="people" element={<People />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
