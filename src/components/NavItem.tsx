import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  path: string,
  text: string,
};

export const NavItem: React.FC<Props> = ({ path, text }) => (
  <NavLink
    className={({ isActive }) => classNames('navbar-item',
      {
        'has-background-grey-lighter': isActive,
      })}
    to={path}
  >
    {text}
  </NavLink>
);
