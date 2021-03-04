import React from 'react';
import { NavLink, Route } from 'react-router-dom';

export const Header: React.FC = () => {

  return (
    <header>
      <h1 className="title">
        People table
      <Route path='/' exact> - Home</Route>
        <Route path='/people'> - People</Route>
      </h1>
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink
            to='/'
            exact
            className="navbar-item is-tab"
            activeClassName="is-active"
          >
            Home
          </NavLink>
          <NavLink
            to='/people'
            className="navbar-item is-tab"
            activeClassName="is-active"
          >
            People
        </NavLink>
        </div>
      </nav>
    </header>
  )
}