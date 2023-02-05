import { NavigationLinkItem } from '../NavigationLinkItem';

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationLinkItem to="/" text="Home" />
        <NavigationLinkItem to="/people" text="People" />
      </div>
    </div>
  </nav>
);
