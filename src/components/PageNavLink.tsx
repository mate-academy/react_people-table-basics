import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

const PageNavLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(
        'navbar-item', { 'has-background-grey-lighter': isActive },
      )}
      end={to === '/'}
    >
      {text}
    </NavLink>
  );
};

export default PageNavLink;
