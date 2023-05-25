import {
  useState,
  useCallback,
  useEffect,
} from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

const findParent = (
  people: Person[],
  parentName: string | null,
): Person | undefined => {
  return people.find(parent => parent.name === parentName);
};

export const PeopleLoader = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = peopleFromServer.map(person => ({
        ...person,
        mother: findParent(peopleFromServer, person.motherName),
        father: findParent(peopleFromServer, person.fatherName),
      }));

      setPeople(preparedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      {people && (
        <PeopleTable people={people} />
      )}

      {!!people.length && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
};
