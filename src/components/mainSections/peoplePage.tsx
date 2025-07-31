import { Outlet } from 'react-router-dom';

export const PeoplePage = () => {
  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <Outlet />
      </div>
    </main>
  );
};
