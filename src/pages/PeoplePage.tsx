import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

const findParent = (people: Person[], parentName: string | null) => {
  return people.find(({ name }) => name === parentName);
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [areNoPeople, setAreNoPeople] = useState(false);

  const loadPeople = async () => {
    setIsLoading(true);
    try {
      const avaliablePeople = await getPeople();

      if (avaliablePeople.length) {
        const peopleWithParents = avaliablePeople.map((person) => {
          const { motherName, fatherName } = person;

          const mother = findParent(avaliablePeople, motherName);
          const father = findParent(avaliablePeople, fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);
      } else {
        setAreNoPeople(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const showPeopleTable = !isError && !areNoPeople;

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {showPeopleTable && (
        <PeopleTable
          people={people}
          isLoading={isLoading}
        />
      )}

      {areNoPeople && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
};
