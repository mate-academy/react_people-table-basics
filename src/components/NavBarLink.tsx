import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  title: string,
  redirectTo: string,
};

export const NavBarLink:React.FC<Props> = ({ title, redirectTo }) => (
  <NavLink
    className={({ isActive }) => cn('navbar-item',
      { 'has-background-grey-lighter': isActive })}
    to={`/${redirectTo}`}
  >
    {title}
  </NavLink>
);
