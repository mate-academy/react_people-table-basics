import React from 'react';

import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <h1>People table</h1>

      <NavLink
        to="/"
        exact
        className="App__button"
        activeClassName="App__button--is_active"
      >
        home&nbsp;
      </NavLink>
      <NavLink
        to="/people"
        className="App__button"
        activeClassName="App__button--is_active"
      >
        pepole
      </NavLink>
    </>
  )
}
