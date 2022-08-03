import React from 'react';

import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return (isActive ? 'is-active' : '');
  };

  return (
    <div className="tabs is-centered is-boxed">
      <ul>
        <li>
          <NavLink
            to="/"
            className={getLinkClass}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="people"
            className={getLinkClass}
          >
            People
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
