import React, { useState, useEffect } from 'react';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    };

    try {
      fetchPeople();
    } catch {
      throw new Error();
    }
  }, []);

  return (
    <>
      <h2 className="title has-text-centered">
        People Page
      </h2>
      <PeopleTable people={people} />
    </>
  );
};
