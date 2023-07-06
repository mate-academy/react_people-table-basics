import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string,
  text: string,
};

export const HeaderNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => cn(
      'navbar-item', {
        'has-background-grey-lighter': isActive,
      },
    )}
    to={to}
  >
    {text}
  </NavLink>
);
