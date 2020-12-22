import React, { useState, useEffect } from 'react';
import { getPeople } from '../../controllers/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Loader } from '../Loader/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);
  if (!people) {
    return (
      <>
        <h2>People page</h2>
        <Loader />
      </>
    );
  }

  return (
    <>
      <h1>People table</h1>
      <PeopleTable people={people} />
    </>
  );
};
