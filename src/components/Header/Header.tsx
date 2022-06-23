import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav
    className="
    navbar is-info
    is-fixed-top
    is-flex is-justify-content-center"
  >
    <div className="navbar-item is-size-4">
      <NavLink
        className={({ isActive }) => (
          isActive ? 'has-text-grey-dark' : 'has-text-white'
        )}
        to="/"
      >
        HomePage
      </NavLink>
    </div>
    <div className="navbar-item is-size-4">
      <NavLink
        className={({ isActive }) => (
          isActive ? 'has-text-grey-dark' : 'has-text-white'
        )}
        to="/people"
      >
        PeoplePage
      </NavLink>
    </div>
  </nav>
);
