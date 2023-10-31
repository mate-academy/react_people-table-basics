import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string;
  children: string;
};

export const NavBarLink: React.FC<Props> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {children}
  </NavLink>
);
