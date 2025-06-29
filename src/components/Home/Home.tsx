import { Link, useLocation } from 'react-router-dom';

export const Home = () => {
  const location = useLocation();
  const isActive = location.pathname === '/';

  return (
    <div className="navbar-brand">
      <Link
        className={`navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`}
        to="/"
      >
        Home
      </Link>
    </div>
  );
};
