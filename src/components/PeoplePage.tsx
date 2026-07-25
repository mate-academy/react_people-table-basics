import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

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

      {isLoading && <Loader />}

      {hasError && (
        <p data-cy="peopleLoadingError">
          Something went wrong
        </p>
      )}

      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {!isLoading && !hasError && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
