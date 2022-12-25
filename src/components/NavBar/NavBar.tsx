import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
);

export const NavBar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">

        <PageNavLink to="/" text="Home" />
        <PageNavLink to="/people" text="People" />

      </div>
    </div>
  </nav>
);
