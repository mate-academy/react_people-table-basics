import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {

  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, [])

  return (
    <>
      <h2 className="subtitle">People page</h2>
      <PeopleTable people={people} />
    </>
  )
}