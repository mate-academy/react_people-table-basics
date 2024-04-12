import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { Content } from './components/Content';
import { Home } from './components/Home';
import { People } from './components/People';
import classNames from 'classnames';

import './App.scss';

export const App = () => {
  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

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
            <NavLink className={getNavLinkClasses} to="/">
              Home
            </NavLink>

            <NavLink className={getNavLinkClasses} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Content />}>
              <Route index element={<Home />} />
              <Route path="people/:personSlug?" element={<People />} />
              <Route path="home" element={<Navigate to="/" replace={true} />} />
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
