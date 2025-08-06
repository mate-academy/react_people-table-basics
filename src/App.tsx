import './App.scss';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Page404 } from './components/Page404';

export const App = () => {
  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  }

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
            <NavLink to="/" end className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="people" className={getNavLinkClass}>
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
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":tabId" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
