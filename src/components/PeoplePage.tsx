import { useEffect, useState } from 'react';
import { getPeople } from '../API/api';
import { Person } from '../react-app-env';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(
        peopleFromServer => setPeople(peopleFromServer.map((person: Person) => {
          const mother = peopleFromServer.find((mother2: Person) => {
            return person.motherName === mother2.name;
          });
          const father = peopleFromServer.find((father2: Person) => {
            return person.fatherName === father2.name;
          });

          return { ...person, mother, father };
        })),
      );
  }, []);

  return (
    <>
      <h1>Peope page</h1>
      <PeopleTable people={people} />
    </>
  );
};
