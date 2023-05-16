import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  text: string;
};

const NavigationLink: React.FC<Props> = ({ to, text }) => {
  return (
    <NavLink
      className={({ isActive }) => classNames('navbar-item', {
        'has-background-grey-lighter': isActive,
      })}
      to={to}
    >
      {text}
    </NavLink>
  );
};

export const Navigation: React.FC = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavigationLink to="/" text="Home" />
          <NavigationLink to="/people" text="People" />
        </div>
      </div>
    </nav>
  );
};
