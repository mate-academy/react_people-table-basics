import { Outlet } from 'react-router-dom';
import { MainNavigation } from '../MainNavigation';

export const Layout = () => (
  <div>
    <MainNavigation />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);
