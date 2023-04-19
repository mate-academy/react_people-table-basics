import { NavigationLink } from '../NavigationLink/NavigationLink';

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationLink url="/" title="Home" />
        <NavigationLink url="/people" title="People" />
      </div>
    </div>
  </nav>
);
