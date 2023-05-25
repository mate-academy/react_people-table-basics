import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  linkRef: string;
  content: string;
}
export const CreateNavLink: React.FC<Props> = ({ linkRef, content }) => (
  <NavLink
    className={({ isActive }) => classNames('navbar-item',
      { 'has-background-grey-lighter': isActive })}
    to={linkRef}
  >
    {content}
  </NavLink>
);

export const NavBar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <CreateNavLink content="Home" linkRef="/" />
        <CreateNavLink content="People" linkRef="people" />
      </div>
    </div>
  </nav>
);
