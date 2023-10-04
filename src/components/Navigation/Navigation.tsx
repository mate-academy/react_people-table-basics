import React from 'react';
import { NavLink } from 'react-router-dom';
import { getNavLinkClass } from '../../utils/getNavLinkClass';

export const Navigation: React.FC = () => {
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
