
import React, { useState, useEffect } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from './PeopleTabel';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
  }, [])

  console.log(people);

  return (
    <div>
      <h2 className="pageTitle">People page</h2>
      <PeopleTable people={people} />
    </div>
  );
} 