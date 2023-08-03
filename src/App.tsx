import {
  NavLink, Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { TablePage } from './pages/TablePage';

export const App = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

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
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>

            <NavLink
              className={getLinkClass}
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
            <Route path="/home" element={<Navigate to="/" />} />

            <Route path="people">
              <Route index element={<TablePage />} />
              <Route path=":selectedSlug" element={<TablePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
