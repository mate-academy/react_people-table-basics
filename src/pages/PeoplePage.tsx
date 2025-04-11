import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { StateContext } from '../store';
import { PeopleTable } from '../components/People';

export const PeoplePage = () => {
  const { people, loading, error } = useContext(StateContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error !== null && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          <PeopleTable />
        </div>
      </div>
    </>
  );
};
