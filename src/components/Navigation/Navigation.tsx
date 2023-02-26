import { NavigationElement } from "../NavigationElement";

export const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavigationElement to='/' title='Home'/>
        <NavigationElement to='/people' title='People' />
      </div>
    </div>
  </nav>
);
