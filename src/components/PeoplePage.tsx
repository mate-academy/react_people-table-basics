import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    (async function fetchData() {
      const fetchedPeople = await getPeople();

      setPeople(fetchedPeople);
    }());
  }, []);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>People Page</h2>

      {people.length !== 0 && <PeopleTable people={people} />}
    </>
  );
};
