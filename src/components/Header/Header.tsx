import { NavLink } from 'react-router-dom';

const Header:React.FC = () => {
  return (
    <nav className="nav">
      <NavLink
        className={({ isActive }) => (isActive
          ? 'button is-link is-active' : 'button is-warning')}
        to="/"
      >
        Home page
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive
          ? 'button is-link is-active' : 'button is-warning')}
        to="/people"
      >
        People page
      </NavLink>
    </nav>
  );
};

export default Header;
