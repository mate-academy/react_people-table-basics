import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people,
    setPeople,
  ] = useState<PersonWithParents[]>([]);

  const getAllPeople = async () => {
    const result = await getPeople();

    const filteredPeople = result.map((person: Person) => {
      const mother = result
        .find((woman: Person) => woman.name === person.motherName) || null;
      const father = result
        .find((man: Person) => man.name === person.fatherName) || null;

      return { ...person, mother, father };
    });

    setPeople(filteredPeople);
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <>
      <h2>People Page</h2>
      {people && <PeopleTable people={people} />}
    </>
  );
};
