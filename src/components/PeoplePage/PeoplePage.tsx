import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[] | null>(null);

  const loadPeople = async () => {
    const peoples = await getPeople();

    const newPeople: People[] = peoples.map((person: People) => {
      return {
        ...person,
        mother: peoples.find((mam: People) => mam.name === person.motherName)
          ? peoples.find((mam: People) => mam.name === person.motherName)
          : null,
        father: peoples.find((dad: People) => dad.name === person.fatherName)
          ? peoples.find((dad: People) => dad.name === person.fatherName)
          : null,
      };
    });

    setPeople(newPeople);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h2 className="subtitle is-3 has-text-centered">People page</h2>

      {people !== null && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
