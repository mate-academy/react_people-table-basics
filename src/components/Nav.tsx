import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const Nav: FC = memo(() => (
  <nav>
    <NavLink
      to="/"
      className={({ isActive }) => cn('Link', { isActive })}
    >
      Home
    </NavLink>
    {' '}
    |
    {' '}
    <NavLink
      to="/people"
      className={({ isActive }) => cn('Link', { isActive })}
    >
      People
    </NavLink>
  </nav>
));

export default Nav;
