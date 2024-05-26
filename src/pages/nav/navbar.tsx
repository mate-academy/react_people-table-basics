import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

  return (
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getLinkClass} to="/">
          Home
        </NavLink>

        <NavLink className={getLinkClass} to="/people">
          People
        </NavLink>
      </div>
    </div>
  );
}
