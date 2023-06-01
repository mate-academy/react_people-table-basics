import { useState, useCallback, useEffect } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

const findParent = (
  people: Person[],
  parentName: string,
): Person | undefined => {
  return people.find(parent => parent.name === parentName);
};

export const PeopleLoader = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    try {
      const PeopleFromServer = await getPeople();

      setPeople(PeopleFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  const preparedPeople: Person[] = people.map(person => ({
    ...person,
    mother: findParent(people, person.motherName || ''),
    father: findParent(people, person.fatherName || ''),
  }));

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (preparedPeople.length === 0) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <>
      <PeopleTable people={preparedPeople} />
    </>
  );
};
