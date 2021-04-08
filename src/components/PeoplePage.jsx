import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeopleList = async() => {
      const response = await getPeople();

      setPeople(response);
    };

    getPeopleList();
  }, []);

  return (
    <div>
      <p>People page</p>
      {people.length ? (
        <PeopleTable people={people} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
