import { useRead } from '../../apiReqests/useRead';
import { Loader } from '../Loader';

import { PeopleTable } from '../PeopleTable';

export const People = () => {
  const { people, hasError, isLoading } = useRead();

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}
            {hasError && !isLoading && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {people?.length === 0 && !isLoading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people?.length !== 0 && !isLoading && people && (
              <PeopleTable people={people} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
