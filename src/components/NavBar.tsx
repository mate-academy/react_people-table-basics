import { NavLink } from 'react-router-dom';

const getActiveClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'has-background-grey-lighter' : '';

const Navbar = () => (
  <nav className="navbar">
    <NavLink to="/" className={getActiveClass}>Home</NavLink>
    <NavLink to="/people" className={getActiveClass}>People</NavLink>
  </nav>
);

export default Navbar;
