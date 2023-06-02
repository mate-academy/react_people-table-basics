import { Route, Routes } from 'react-router-dom';

import './App.scss';
import { PageNavLink } from './components/PageNavLink/PageNavLink';
import { PeopleTable } from './components/PeopleBlock/PeopleBlock';

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
            path="*"
            element={<h1 className="title">Page not found</h1>}
          />
          <Route
            path="/"
            element={<h1 className="title">Home Page</h1>}
          />
          <Route path="people">
            <Route
              index
              element={<PeopleTable />}
            />
            <Route
              path=":slug"
              element={<PeopleTable />}
            />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
