import { Outlet } from 'react-router-dom';

export const PageNotFound = () => (
  <>
    <>
      <h1 className="title">Page not found</h1>
    </>
    <div className="block">
      <Outlet />
    </div>
  </>
);
