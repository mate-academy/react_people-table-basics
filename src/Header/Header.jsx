import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <>
      <NavLink to="/">
        Home Page
      </NavLink>
      <NavLink to="/people">
        Peaple Page
      </NavLink>
    </>
  );
}
