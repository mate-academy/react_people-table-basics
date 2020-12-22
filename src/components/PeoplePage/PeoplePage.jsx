import React, { useState, useEffect } from 'react';
import { getPeople } from '../../controllers/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <>
      <h1>People table</h1>
      <PeopleTable people={people} />
    </>
  );
};
