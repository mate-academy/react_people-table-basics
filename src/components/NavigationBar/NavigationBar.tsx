import { FC } from 'react';
import { NavigationLink } from '../NavigationLink';

export const NavigationBar: FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavigationLink
            link="/"
            title="Home"
          />

          <NavigationLink
            link="/people"
            title="People"
          />
        </div>
      </div>
    </nav>
  );
};
