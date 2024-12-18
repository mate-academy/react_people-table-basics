import './App.scss';
import { Outlet, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';

export const App = () => {
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];

    html.classList.add('has-navbar-fixed-top');
  }, []);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item ', {
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
            <NavLink className={getLinkClass} to="/">
              Home
            </NavLink>

            <NavLink className={getLinkClass} to="/people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
