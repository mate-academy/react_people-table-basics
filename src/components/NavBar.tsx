import { NavLink } from 'react-router-dom';
import { getClassForLink } from '../services/functions';

export const NavBar = () => {
  return (
    <div className="navbar-brand">
      <NavLink className={getClassForLink} to="/">
        Home
      </NavLink>

      <NavLink className={getClassForLink} to="/people">
        People
      </NavLink>
    </div>
  );
};
