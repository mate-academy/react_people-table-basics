import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const peopleResponse = await getPeople();

      const peopleWithParents = peopleResponse.map(person => {
        const mother = peopleResponse
          .find(personMother => personMother.name === person.motherName);
        const father = peopleResponse
          .find(personFather => personFather.name === person.fatherName);

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(peopleWithParents);
    } catch {
      setError('Error loading people');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} error={error} isLoading={isLoading} />
    </>
  );
};
