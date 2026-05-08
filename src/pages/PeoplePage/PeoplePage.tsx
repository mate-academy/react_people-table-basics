import { useEffect } from 'react';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { usePeople } from '../../store/PeopleContext';

export const PeoplePage = () => {
  const { people, peopleSlugs, fetchPeople, isLoading, hasError } = usePeople();

  useEffect(() => {
    fetchPeople();
    // I'd like some caching, or simply fetch in the provider.
  }, [fetchPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {/* Initially this came before error */}
          {!hasError && isLoading && <Loader />}

          {!hasError && !isLoading && !peopleSlugs.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!hasError && !isLoading && !!peopleSlugs.length && (
            <PeopleTable people={people} peopleSlugs={peopleSlugs} />
          )}
        </div>
      </div>
    </>
  );
};
