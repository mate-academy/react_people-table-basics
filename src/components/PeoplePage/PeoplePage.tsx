import {
  FC, memo, useCallback, useEffect, useState,
} from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

const findParent = (people: Person[], parentName: string | null) => {
  return people.find(parent => parent.name === parentName);
};

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadPeople = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      const formattedPeople = peopleFromServer.map(person => {
        return {
          ...person,
          mother: findParent(peopleFromServer, person.motherName),
          father: findParent(peopleFromServer, person.fatherName),
        };
      });

      setPeople(formattedPeople);
    } catch {
      setLoadingError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
    setPeople([]);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {!isLoading && (
            <>
              {loadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length ? (
                <PeopleTable
                  people={people}
                />
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
