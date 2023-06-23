import { PageNavlink } from './PageNavlink';

export const MainNav = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavlink to="/" text="Home" />
        <PageNavlink to="/people" text="People" />
      </div>
    </div>
  </nav>
);
