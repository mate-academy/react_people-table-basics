import { Outlet } from 'react-router-dom';

export const MainSection = () => (
  <main className="section">
    <div className="container">
      <Outlet />
    </div>
  </main>
);
