import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="navbar-item is-2"
          >
            Home
          </NavLink>
          <NavLink
            to="/people"
            className="navbar-item is-2"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
