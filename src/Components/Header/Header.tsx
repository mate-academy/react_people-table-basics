import { NavLink } from 'react-router-dom';
import 'bulma';
import './Header.scss';

export const Header = () => (
  <header>
    <nav className="nav tabs">
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? 'red' : '',
              borderBottom: isActive ? '1px solid #f00' : '',
            })}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/people"
            style={({ isActive }) => ({
              color: isActive ? 'red' : '',
              borderBottom: isActive ? '1px solid #f00' : '',
            })}
          >
            People
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
