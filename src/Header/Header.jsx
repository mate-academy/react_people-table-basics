import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <>
      <NavLink
        to="/"
        exact
        activeClassName="is-active"
        className="link"
      >
        Home Page
      </NavLink>
      <NavLink
        to="/people"
        activeClassName="is-active"
        className="link"
      >
        People Page
      </NavLink>
    </>
  );
}
