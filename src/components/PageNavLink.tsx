import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface PageNavLinkProps {
  to: string,
  title: string,
}

export const PageNavLink: FC<PageNavLinkProps> = ({ to, title }) => (
  <NavLink
    className={
      ({ isActive }) => classNames(
        'navbar-item', {
          'is-active': isActive,
          'has-background-grey-lighter': isActive,
        },
      )
    }
    to={to}
  >
    {title}
  </NavLink>
);
