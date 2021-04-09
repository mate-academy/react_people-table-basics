import React, { useEffect, useState } from 'react';
import { getPeopleWithParents } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeopleWithParents()
      .then(setPeople);
  }, []);

  return (
    <>
      <h2>People Page</h2>
      <PeopleTable people={people} />
    </>
  );
};
