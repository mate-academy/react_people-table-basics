import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  to: string,
  content: string,
};

export const NavLinkComponent: React.FC<Props> = ({ to, content }) => (
  <NavLink
    className={({ isActive }) => cn(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={`${to}`}
  >
    {content}
  </NavLink>
);
