import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

const findParent = (
  people: Person[],
  parentName: string | null,
): Person | undefined => {
  return people.find((parent) => parent.name === parentName);
};

export const PeopleLoader = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setHasError(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  const preparedPeople: Person[] = useMemo(() => people.map((person) => ({
    ...person,
    mother: findParent(people, person.motherName),
    father: findParent(people, person.fatherName),
  })), [people]);

  if (isLoading) {
    return (<Loader />);
  }

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <PeopleTable people={preparedPeople} />
  );
};
