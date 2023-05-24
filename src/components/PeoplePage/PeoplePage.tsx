import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPeople()
      .then(pupils => {
        const peopleWithParents = pupils.map(person => {
          const mother = pupils.find(
            motherOfPerson => motherOfPerson.name === person.motherName,
          );
          const father = pupils.find(
            fatherOfPerson => fatherOfPerson.name === person.fatherName,
          );

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError('Failed to load people');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      {people && (
        <PeopleTable people={people} isLoading={isLoading} error={error} />
      )}
    </div>
  );
};
