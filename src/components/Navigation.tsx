import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className="nav nav-pills nav-fill">
    <NavLink
      to="/"
      className={({
        isActive,
      }) => `navbar-item is-tab nav-link ${isActive ? ' active' : ''}`}
    >
      Home
    </NavLink>
    <NavLink
      to="/people"
      className={({
        isActive,
      }) => `navbar-item is-tab nav-link ${isActive ? ' active' : ''}`}
    >
      People
    </NavLink>
  </nav>
);

export default Navigation;
