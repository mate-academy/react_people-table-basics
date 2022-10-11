import classNames from 'classnames';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

const PageNavLink: React.FC<Props> = ({ to, text }) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={to}
      className={classNames(
        'navbar-item', { 'has-background-grey-lighter': pathname === to },
      )}
    >
      {text}
    </NavLink>
  );
};

export default PageNavLink;
