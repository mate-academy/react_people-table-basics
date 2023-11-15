import { Outlet } from 'react-router-dom';

export const PageLayout = () => (
  <main className="section">
    <div className="container">
      <Outlet />
    </div>
  </main>
);
