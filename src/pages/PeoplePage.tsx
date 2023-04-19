import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getParent } from '../helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasError] = useState(false);

  const loadPeople = useCallback(async () => {
    try {
      const loadedPeople = await getPeople();

      const peopleWithParents = loadedPeople.map(person => ({
        ...person,
        mother: getParent(loadedPeople, person.motherName),
        father: getParent(loadedPeople, person.fatherName),
      }));

      setPeople(peopleWithParents);
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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!hasLoadingError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!hasLoadingError && people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
