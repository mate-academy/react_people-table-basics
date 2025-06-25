import { FC } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.scss';

const isAciveClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const App: FC = () => {
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
            <NavLink to="/" end className={isAciveClass}>
              Home
            </NavLink>

            <NavLink className={isAciveClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeoplePage />}></Route>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
