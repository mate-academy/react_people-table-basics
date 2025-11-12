import './App.scss';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import classNames from 'classnames';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const App = () => {
  const isActived = ({ isActive }) => {
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
            <NavLink className={isActived} to="/">
              Home
            </NavLink>

            <NavLink className={isActived} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/people" element={<PeoplePage />}></Route>
            <Route path="/people/:slug" element={<PeoplePage />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
