import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTabele';

export function PeoplePage() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <>
      <h1> People Page</h1>
      <PeopleTable people={people} />
    </>
  );
}
