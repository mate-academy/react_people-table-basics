import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasError] = useState(false);
  const [hasDataError, setHasDataError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedPeople = await getPeople();

      if (!loadedPeople.length) {
        setHasDataError(true);
      }

      setPeople(loadedPeople);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {hasLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasDataError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
