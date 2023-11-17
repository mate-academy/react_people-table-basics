import { NavLink, Outlet } from 'react-router-dom';
import './App.scss';
import cn from 'classnames';

export const App = () => {
  const isActiveButton = ({ isActive }: { isActive: boolean }) => (
    cn('navbar-item', { 'has-background-grey-lighter': isActive })
  );

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
            <NavLink className={isActiveButton} to="/">
              Home
              </NavLink>

<NavLink
  className={isActiveButton}
  to="/people"
>
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
