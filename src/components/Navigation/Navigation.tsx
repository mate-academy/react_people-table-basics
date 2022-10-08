import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
  end?: boolean;
};

const PageNavLink: React.FC<Props> = ({ to, text, end }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'navbar-item',
      { 'has-background-grey-lighter': isActive },
    )}
    to={to}
    end={end}
  >
    {text}
  </NavLink>
);

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
          <PageNavLink to="/" text="Home" end />

          <PageNavLink to="people" text="People" />
        </div>
      </div>
    </nav>
  );
};
