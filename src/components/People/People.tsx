import { Link, useLocation } from 'react-router-dom';

export const People = () => {
  const location = useLocation();
  const isActive = location.pathname.startsWith('/people');

  return (
    <div className="navbar-brand">
      <Link
        className={`navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`}
        to="/people"
      >
        People
      </Link>
    </div>
  );
};
