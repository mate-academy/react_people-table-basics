import { FC, memo } from 'react';
// import { NavLink as CustomLink } from 'react-router-dom';
import { CustomLink } from '../../Helpers/CustomLink';

export const Navigation:FC = memo(() => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <CustomLink title="Home" to="/" />
          <CustomLink title="People" to="people" />
        </div>
      </div>
    </nav>
  );
});
