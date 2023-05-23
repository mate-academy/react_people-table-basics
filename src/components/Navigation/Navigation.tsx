import { NavigationLink } from '../NavigationLink/NavigationLink';

export const Navigation = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavigationLink addr="/" content="Home" />
          <NavigationLink addr="/people" content="People" />
        </div>
      </div>
    </nav>
  );
};
