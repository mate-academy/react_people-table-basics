import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';

export const App = () => {
  const activeClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    );
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
            <NavLink className={activeClass} to="/">Home</NavLink>
            <NavLink className={activeClass} to="/people">People</NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
