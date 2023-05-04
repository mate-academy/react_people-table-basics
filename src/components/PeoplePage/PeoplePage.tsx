import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then((fetchedPeople) => {
        const populatedPeopleWithParents = fetchedPeople.map((person) => {
          const mother = fetchedPeople.find(
            (motherPerson) => motherPerson.name === person.motherName,
          );
          const father = fetchedPeople.find(
            (fatherPerson) => fatherPerson.name === person.fatherName,
          );

          return { ...person, mother, father };
        });

        setPeople(populatedPeopleWithParents);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} error={error} isLoading={isLoading} />
    </>
  );
};
