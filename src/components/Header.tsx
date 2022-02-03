import { NavLink } from 'react-router-dom';
import 'bulma/css/bulma.css';

export const Header = () => (
  <header className="Header">
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item is-tab">
          Home
        </NavLink>

        <NavLink to="/people" className="navbar-item is-tab">
          People
        </NavLink>

      </div>
    </nav>
  </header>
);
