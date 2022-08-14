import { Outlet } from 'react-router-dom';

export const Wrapper = () => (
  <main className="section">
    <div className="container">
      <Outlet />
    </div>
  </main>
);
