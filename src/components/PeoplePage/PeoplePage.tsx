/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { getPeople } from '../../API/api-people';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h2>People page</h2>
      <PeopleTable people={people} />
    </>
  );
};
