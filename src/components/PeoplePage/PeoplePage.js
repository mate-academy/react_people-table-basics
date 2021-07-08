import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(result => setPeople(result));
  }, []);

  return (
    <>
      <h1 className="title">People page</h1>
      {(people.length !== 0) && (
      <PeopleTable people={people} />
      )}
    </>
  );
};
