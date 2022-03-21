import { Link, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <header className="header">
        <Link to="/">Home</Link>
        <Link to="/people">People</Link>
      </header>

      <Outlet />

    </>
  );
};
