import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <Loader />

          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>

          <p data-cy="noPeopleMessage">There are no people on the server</p>
          <PeopleTable />
        </div>
      </div>
    </div>
  );
};
