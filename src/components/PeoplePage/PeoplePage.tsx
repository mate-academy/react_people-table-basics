import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoPeople, setHasNoPeople] = useState(false);

  const showPeople = !hasNoPeople && !error;

  const getPeopleFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const allPeople = await getPeople();

      if (allPeople.length) {
        setIsLoading(false);
        setPeople(allPeople);
      } else {
        setHasNoPeople(true);
      }
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const peopleWithParents = useMemo(() => {
    return people.map(person => {
      const isMother = people.find(({ name }) => name === person.motherName);
      const isFather = people.find(({ name }) => name === person.fatherName);

      return ({
        ...person,
        mother: isMother,
        father: isFather,
      });
    });
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {hasNoPeople && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {showPeople && (
        <PeopleTable
          people={peopleWithParents}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
