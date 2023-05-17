import {
  memo, useEffect, useState, useCallback,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleList } from './PeopleList';

const findParent = (people: Person[], parentName: string | null) => {
  return people.find((person) => person.name === parentName);
};

export const PeoplePage = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const LoadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map((person) => ({
        ...person,
        mother: findParent(peopleFromServer, person.motherName),
        father: findParent(peopleFromServer, person.fatherName),
      }));

      setPeople(peopleWithParents);
      setIsLoading(false);
    } catch {
      setErrorMessage('Failed to load people');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    LoadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && (
            <>
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length > 0 ? (
                <PeopleList people={people} />
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
});
