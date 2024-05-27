import { Outlet } from 'react-router-dom';

const PeoplePage = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <Outlet />
    </>
  );
};

export default PeoplePage;
