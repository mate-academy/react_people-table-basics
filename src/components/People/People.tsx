import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/people';
import PeopleTable from '../PeopleTable';
import './People.scss';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Human[]>([]);

  const loadPeople = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    loadPeople();

    return () => {

    };
  }, []);

  const preparedPeople: PreparedHuman[] = people.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });

  return (
    <>
      <h1>People</h1>
      <PeopleTable people={preparedPeople} />
    </>

  );
};
