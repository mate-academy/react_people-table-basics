import { NavigationLink } from '../NavigationLink';

export const Navigation: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationLink to="/" path="Home" />
        <NavigationLink to="/people" path="People" />
      </div>
    </div>
  </nav>
);
