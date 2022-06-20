import { useEffect, useState } from 'react';
import { getPeople } from '../api/getPeople';
import { PeopleTable } from './PeopleTable/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(res => setPeople(res.map((el: Person) => {
        const mother = res.find((person: Person) => {
          return person.name === el.motherName;
        });

        const father = res.find((person: Person) => {
          return person.name === el.fatherName;
        });

        return { ...el, mother, father };
      })));
  }, []);

  return (
    <>
      <h1 className="title">Peope page</h1>
      <PeopleTable people={people} />
    </>
  );
};
