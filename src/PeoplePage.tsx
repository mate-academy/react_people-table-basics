import { useCallback, useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import { Person } from './types';
import { ErrorType } from './types/ErrorType';
import { PeoplesTable } from './PeoplesTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPeople();

      const peopleWithParentsInfo = response.map((person) => {
        const mother = response.find(p => p.name === person.motherName);
        const father = response.find(p => p.name === person.fatherName);

        return {
          ...person,
          mother,
          father,
        };
      });

      setIsLoading(false);
      if (response.length === 0) {
        setError(ErrorType.noPeopleOnServer);
      }

      setPeople(peopleWithParentsInfo);
    } catch {
      setIsLoading(false);
      setError(ErrorType.responseError);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error === ErrorType.responseError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {error === ErrorType.noPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!error && (
            <PeoplesTable
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};
