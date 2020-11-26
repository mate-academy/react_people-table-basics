import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable'

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
  }, [])

  return (
    <>
      <h1>People Page</h1>

      <PeopleTable people={people} />
    </>
  );
};
