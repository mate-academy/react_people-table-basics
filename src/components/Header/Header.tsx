import React from 'react';

import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => {
            return {
              color: isActive ? 'red' : 'green',
            };
          }}
          end
        >
          Homepage
        </NavLink>
        {'  '}
        <NavLink
          to="/people"
          end
        >
          People
        </NavLink>
      </nav>
    </header>
  );
};
