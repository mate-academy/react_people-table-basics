/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { getPeople } from '../../API/api-people';
import { PeopleTable } from '../PeopleTable';

type Props = {
  active: () => void,
};

export const PeoplePage: React.FC<Props> = ({ active }) => {
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    active();
    fetchPeople();
  }, []);

  return (
    <>
      <h2>People page</h2>
      <PeopleTable people={people} />
    </>
  );
};
