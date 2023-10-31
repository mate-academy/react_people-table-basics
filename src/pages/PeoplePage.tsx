import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleContext } from '../store/PeopleContext';

export const PeoplePage = () => {
  const { isLoading, hasError, people } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {hasError}
            </p>
          )}

          {isLoading && (<Loader />)}

          {!people.length && !hasError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!hasError && !isLoading && !!people.length && (
            <PeopleTable />
          )}
        </div>
      </div>
    </>
  );
};
