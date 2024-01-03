import {
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import './App.scss';
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
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="/people">
            <Route index element={<People />} />
            <Route path=":slug?" element={<People />} />
          </Route>

          <Route element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
