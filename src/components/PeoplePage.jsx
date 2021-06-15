import React, { useEffect, useState } from 'react';
import '../App.scss';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <>
      <h2>People page</h2>
      <PeopleTable people={people} />
    </>
  );
};
