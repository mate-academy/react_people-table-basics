import { Outlet } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  return (
    <>
      {/* <h1 className="title">People Page</h1> */}

      <Outlet />
    </>
  );
};
