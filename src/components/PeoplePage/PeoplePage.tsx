import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(response => {
      const preparedPeople = response.map(person => {
        const father = response
          .find(dad => dad.name === person.fatherName);
        const mother = response
          .find(mom => mom.name === person.motherName);

        return { ...person, mother, father };
      });

      setPeople(preparedPeople);
    });
  });

  return (
    <>
      <h1>People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
