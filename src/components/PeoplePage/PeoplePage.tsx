import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents = peopleFromServer.map((person) => {
          const mother = peopleFromServer.find(
            (motherPerson) => motherPerson.name === person.motherName,
          );
          const father = peopleFromServer.find(
            (fatherPerson) => fatherPerson.name === person.fatherName,
          );

          return { ...person, mother, father };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError('Unable to load people');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable
        people={people}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};
