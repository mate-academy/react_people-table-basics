import { useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { usePeople } from '../store/PeopleContext';

export const PeoplePage = () => {
  const { people, status, loadPeople } = usePeople();

  useEffect(() => {
    void loadPeople();
  }, [loadPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {status === 'loading' && <Loader />}
          {status === 'error' && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {status === 'success' && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {status === 'success' && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
