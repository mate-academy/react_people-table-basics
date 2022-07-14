import React, { useState, useCallback, useEffect } from 'react';
import { getPeople } from '../api/people';
import { Person } from '../react-app-env';
import { PeopleTable } from './PeopleTable';
import 'bulma';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const loadPeople = useCallback(
    async () => {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    },
    [],
  );

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h2 className="title is-2">People page</h2>

      {people && <PeopleTable people={people} />}
    </>
  );
};
