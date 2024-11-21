import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import classNames from 'classnames';

export const App = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#485fc7' : '',
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
            <NavLink className={getLinkClass} style={getLinkStyle} to="/">
              Home
            </NavLink>

            <NavLink className={getLinkClass} style={getLinkStyle} to="/people">
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
