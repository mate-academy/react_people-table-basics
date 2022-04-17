import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import home_page from '../images/home_page.png';

export const MainNavigation: React.FC = () => {
  return (
    <nav className="navbar">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            <img
              src={home_page}
              alt="home_page"
            />
          </Link>

          <NavLink
            to="/"
            className="navbar-item is-tab"
          >
            Home page
          </NavLink>

          <NavLink
            className="navbar-item is-tab"
            to="/people"
          >
            People Page
          </NavLink>

        </div>
      </div>
    </nav>
  );
};
