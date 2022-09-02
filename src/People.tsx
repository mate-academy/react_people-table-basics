import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import { Person } from './types';
import { PeopleTable } from './PeopleTable';

export const People = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => {
        if (!response.length) {
          setIsEmpty(true);

          return;
        }

        setPeople(response);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

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

          {isEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          <PeopleTable people={people} />
        </div>
      </div>
    </>
  );
};
