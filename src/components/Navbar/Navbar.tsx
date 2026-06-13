import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const getClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', isActive && 'has-background-grey-lighter');

export const Navbar = () => {
  return (
    <div className="navbar-brand">
      <NavLink className={getClass} to="/">
        Home
      </NavLink>

      <NavLink className={getClass} to="/people">
        People
      </NavLink>
    </div>
  );
};
