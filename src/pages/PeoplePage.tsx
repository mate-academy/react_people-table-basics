import { Outlet } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>
      </div>

      <PeopleTable />
      <Outlet />
    </>
  );
};
