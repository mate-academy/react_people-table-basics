import { NavigationPage } from '../page/NavigationPage';

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationPage to="/" text="Home" />
        <NavigationPage to="people" text="People" />
      </div>
    </div>
  </nav>
);
