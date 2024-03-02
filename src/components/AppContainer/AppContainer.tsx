import { Outlet } from 'react-router-dom';

export const AppContainer = () => {
  return (
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
};
