import { NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import { PeoplePage } from './components/SetPeople';
// import { Loader } from './components/Loader'; import {PeoplePage} from "./components/SetPeople";

export const App = () => {
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
            <NavLink
              to="/"
              className={
                ({ isActive }) => (isActive
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item')
              }
              replace
            >
              Home
            </NavLink>

            <NavLink
              to="people"
              className={
                ({ isActive }) => (isActive
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item')
              }
              replace
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route
              path="/"
              element={<h1 className="title">Home page</h1>}
            />

            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
