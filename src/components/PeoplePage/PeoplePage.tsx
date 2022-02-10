import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/getPeople';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchedPeople = async () => {
      const result = await getPeople();

      setPeople(result);
    };

    fetchedPeople();
  }, []);

  return (
    <>
      <h2>People Page</h2>
      <PeopleTable people={people} />
    </>
  );
};
