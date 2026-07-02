import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setIsLoaded(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
        setPeople([]);
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoaded(true);
      });
  }, []);

  const hasPeople = people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && isLoaded && !hasError && !hasPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && !hasError && hasPeople && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};