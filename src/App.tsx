import classNames from 'classnames';
import './App.scss';
import { Outlet, NavLink } from 'react-router-dom';

export const App = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <html className="has-navbar-fixed-top">
      <main data-cy="app">
        <nav
          data-cy="nav"
          className="navbar is-fixed-top has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <NavLink className={getNavLinkClass} to="/">
                Home
              </NavLink>

              <NavLink className={getNavLinkClass} to="/people">
                People
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="section"> {<Outlet />} </div>
      </main>
    </html>
  );
};
