import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person []>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const data = await getPeople();

      setPeople(data);
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1>People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
