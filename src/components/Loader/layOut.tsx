import { Outlet } from 'react-router-dom';
import { TopNav } from './topNav';

export const LayOut = () => {
  return (
    <>
      <div data-cy="nav">
        <TopNav />
      </div>
      <Outlet />
    </>
  );
};
