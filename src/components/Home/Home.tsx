import { Link, useLocation } from 'react-router-dom';

export const Home = () => {
  const location = useLocation();
  // Home fica ativo quando estamos na rota '/' (quando foi clicado)
  const isActive = location.pathname === '/';

  return (
    <div className="navbar-brand">
      <Link
        to="/"
        className={`navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`}
      >
        Home
      </Link>
    </div>
  );
};
