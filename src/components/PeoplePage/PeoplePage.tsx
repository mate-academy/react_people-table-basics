import React, { useState, useEffect, useMemo } from 'react';
import { Circles } from '../Circles/Circles';
import { Person } from '../../Types/Types';
import { Table } from '../Table/Table';
import { getPeople } from '../../api/api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(response => (setPeople(response)));
  }, []);

  const findedPerson = useMemo(() => {
    return people.map(person => ({
      ...person,
      father: people.find(father => father.name === person.fatherName),
      mother: people.find(mother => mother.name === person.motherName),
    }));
  }, [people]);

  return (
    <>
      {(people.length === 0)
        ? <Circles height={80} width={80} color="red" />
        : <Table people={findedPerson} />}
    </>
  );
};
