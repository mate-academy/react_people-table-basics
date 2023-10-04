import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <>
      <NavLink
        className={getNavLinkClass}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={getNavLinkClass}
        to="/people"
      >
        People
      </NavLink>
    </>
  );
};
