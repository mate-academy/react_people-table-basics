import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  linkText: string;
};

export const NavigationLink: React.FC<Props> = ({ to, linkText }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
  >
    {linkText}
  </NavLink>
);
