import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { Person } from '../../react-app-env';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const getAllPeople = async () => {
    await getPeople()
      .then(response => setPeople(response.map((person: Person) => {
        const mother = response.find((mom: Person) => {
          return person.motherName === mom.name;
        });
        const father = response.find((dad: Person) => {
          return person.fatherName === dad.name;
        });

        return { ...person, mother, father };
      })));
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <PeopleTable people={people} />
  );
};
