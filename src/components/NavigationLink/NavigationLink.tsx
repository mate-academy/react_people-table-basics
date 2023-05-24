import { NavLink } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  title: string;
  to: string;
}

export const NavigationLink: React.FC<Props> = ({ title, to }) => (
  <NavLink
    className={({ isActive }) => cn(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={to}
  >
    {title}
  </NavLink>
);
