import { NavigationLink } from '../NavigationLink/NavigationLink';

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationLink title="Home" to="/" />

        <NavigationLink title="People" to="/people" />
      </div>
    </div>
  </nav>
);
