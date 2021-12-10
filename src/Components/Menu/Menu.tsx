import { NavLink } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => {
  return (
    <div className="menu">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Home page
      </NavLink>
      <NavLink
        to="/people"
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        People page
      </NavLink>
    </div>
  );
};
