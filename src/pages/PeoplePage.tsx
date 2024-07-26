import { Outlet } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>
      </div>
      <div className="block">
        <div className="box table-container">
          <PeopleTable />

          <Outlet />
        </div>
      </div>

      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>

      <p data-cy="noPeopleMessage">There are no people on the server</p>
    </>
  );
};
