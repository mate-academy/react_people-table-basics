import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { PeopleTable } from './components/PeopleTable';

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
          <Navigation
            to="/"
            title="Home"
          />

          <Navigation
            to="/people"
            title="People"
          />
        </div>
      </div>
    </nav>
    <main className="section">
      <div className="container">
        <div className="block">
          <div className="box table-container">
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="people">
                <Route index element={<PeopleTable />} />
                <Route path=":slug" element={<PeopleTable />} />
              </Route>
              <Route
                path="*"
                element={(
                  <h1 className="title">Page not found</h1>)}
              />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  </div>
);
