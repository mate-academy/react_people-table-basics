import { Link, useLocation } from 'react-router-dom';

export const People = () => {
  const location = useLocation();
  const isActive = location.pathname === '/';

  return (
    <div className="navbar-brand">
      <Link
        className={`navbar-item ${isActive ? 'is-active' : 'has-background-grey-lighter'}`}
        to="/people"
      >
        People
      </Link>
    </div>
  );
};
