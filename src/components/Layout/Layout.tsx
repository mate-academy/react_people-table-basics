import { Link, Outlet } from 'react-router-dom';
import './layout.scss';

export const Layout = () => {
  return (
    <>
      <header className="header-nav header">
        <Link className="header-nav__link" to="/">Home</Link>
        <Link className="header-nav__link" to="/people">People</Link>
      </header>
      <Outlet />
    </>
  );
};
