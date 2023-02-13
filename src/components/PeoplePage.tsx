import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const peopleSetter = async () => {
    try {
      setHasError(false);
      setIsLoading(true);
      const pep = await getPeople();

      setPeople(pep);
      setIsLoading(false);
    } catch (_) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    peopleSetter();
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

          {people && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
