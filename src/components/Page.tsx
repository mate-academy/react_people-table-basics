import { Outlet } from 'react-router-dom';
import { PageNavigation } from './PageNavigation';

export const Page = () => {
  return (
    <>
      <PageNavigation />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};
