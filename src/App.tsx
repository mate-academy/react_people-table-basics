import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import './App.scss';
import { Link } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import PeoplePage from './components/PeoplePage/PeoplePage';

export const App = () => {
  const location = useLocation();
  const isPeople = location.pathname.startsWith('/people');

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
            <Link className={
              location.pathname === '/'
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            } to="/">
              Home
            </Link>

            <Link
              className={
              isPeople
                ? 'navbar-item has-background-grey-lighter'
                : 'navbar-item'
            }
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":person" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </div>
  );
}