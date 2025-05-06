import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';
import { HomePage } from './components/HomePage';
import { ErrorPage } from './components/ErrorPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  const isActiveValue = ({ isActive }: { isActive: boolean }) => {
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
            <NavLink className={isActiveValue} to="/" end>
              Home
            </NavLink>

            <NavLink className={isActiveValue} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people/:personSlug?" element={<PeoplePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
