/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
        <div>
          <NavLink style={{ color: 'black', lineHeight: '10px', textDecoration: 'none' }} to="/">Home</NavLink>
        </div>

        <div>
          <NavLink style={{ color: 'black', lineHeight: '10px', textDecoration: 'none' }} to="/people">People</NavLink>
        </div>
      </div>
    </>
  );
};
