import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && <Loader />}
        {hasError && (
          <p data-cy="peopleLoadingError" className="help is-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !hasError && people.length === 0 && (
          <p data-cy="noPeopleMessage" className="help">
            No people found
          </p>
        )}

        {!isLoading && !hasError && people.length > 0 && (
          <PeopleTable people={people} />
        )}
      </div>
    </>
  );
};
