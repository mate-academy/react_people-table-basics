import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

const toFindParents = (people: Person[], personName: string | null) => {
  const personParent = people.find(({ name }) => name === personName);

  return personParent;
};

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoPeople, setHasNoPeople] = useState(false);

  const showPeople = !hasNoPeople && !error;

  const getPeopleFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const allPeople = await getPeople();
      const peopleWithParents = allPeople.map((person) => {
        return (
          {
            ...person,
            mother: toFindParents(allPeople, person.motherName),
            father: toFindParents(allPeople, person.fatherName),
          }
        );
      });

      if (allPeople.length) {
        setIsLoading(false);
        setPeople(peopleWithParents);
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
          people={people}
          isLoading={isLoading}
        />
      )}
    </>
  );
});
