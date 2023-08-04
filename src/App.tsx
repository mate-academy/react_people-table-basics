import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';

const activeLink = ({ isActive }: { isActive: boolean }) => cn('navbar-item', {
  'has-background-grey-lighter': isActive,
});

export const App: React.FC = () => {
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
            <NavLink className={activeLink} to="..">
              Home
            </NavLink>

            <NavLink className={activeLink} to="people">
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
