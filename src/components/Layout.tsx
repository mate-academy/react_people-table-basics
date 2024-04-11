import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar/NavBar';

export const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <main className="section">
        <Outlet />
      </main>
    </>
  );
};
