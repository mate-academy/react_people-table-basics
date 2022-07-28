import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from './peopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person []>([]);

  useEffect(
    () => {
      getPeople().then(peopleFromServer => {
        const prepearingPeople = [...peopleFromServer].map(person => {
          return {
            ...person,
            mother: peopleFromServer.find(
              (mother: Person) => mother.name === person.motherName,
            ) || null,
            father: peopleFromServer.find(
              (father: Person) => father.name === person.fatherName,
            ) || null,

          };
        });

        setPeople(prepearingPeople);
      });
    }, [],
  );

  return (
    <PeopleTable people={people} />
  );
};
