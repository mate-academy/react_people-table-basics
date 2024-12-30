import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import classNames from 'classnames';

export const App = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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

            <NavLink className={getLinkClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Routes>
    </div>
  );
};
