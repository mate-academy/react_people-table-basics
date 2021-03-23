import React, { useState, useEffect } from 'react';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../API/api';

export function PeoplePage() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <>
      <h2 className="title">People page</h2>
      <PeopleTable people={people} />
    </>
  );
}
