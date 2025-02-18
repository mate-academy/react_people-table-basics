import { Outlet } from 'react-router-dom';
import { Nav } from '../Nav';

export const Layout: React.FC = () => {
  return (
    <div data-cy="app">
      <Nav />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
