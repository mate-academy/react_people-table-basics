import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/home">
            Home Page
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/people">
            People Page
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
