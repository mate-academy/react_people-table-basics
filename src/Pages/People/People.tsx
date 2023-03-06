import { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const peopleWithParents = useCallback((
    peopleToUpdate: Person[],
  ): Person[] => {
    return peopleToUpdate.map(person => {
      const { motherName, fatherName } = person;

      return {
        ...person,
        mother: peopleToUpdate.find((human) => (
          human.name === motherName
        )),
        father: peopleToUpdate.find((human) => (
          human.name === fatherName
        )),
      };
    });
  }, []);

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const newPeople = await getPeople();

      setPeople(peopleWithParents(newPeople));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable
        people={people}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};
