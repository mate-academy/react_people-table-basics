import React from 'react';

interface NavbarProps {
  currentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const isHome = currentPath === '/' || currentPath === '';
  const isPeople = currentPath.startsWith('/people');

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a
            className={`navbar-item ${isHome ? 'has-background-grey-lighter' : ''}`}
            href="#/"
          >
            Home
          </a>

          <a
            className={`navbar-item ${isPeople ? 'has-background-grey-lighter' : ''}`}
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};
