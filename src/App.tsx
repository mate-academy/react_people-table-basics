import {
  Routes, Route, NavLink, Navigate,
} from 'react-router-dom';
import { People } from './components/peopleTable';

import './App.scss';

const isNavbarChoosen = ({ isActive }: { isActive: boolean }) => (
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item');

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
          <NavLink
            to="/"
            className={isNavbarChoosen}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={isNavbarChoosen}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<People />} />
            <Route path=":slug?" element={<People />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>

      </div>
    </main>
  </div>
);
