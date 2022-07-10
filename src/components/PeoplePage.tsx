import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

  const loadPeople = useCallback(
    async () => {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    },
    [],
  );

  useEffect(
    () => {
      loadPeople();
    },
    [],
  );

  return (
    <>
      <p className="title">People Page</p>

      <PeopleTable people={people} />
    </>
  );
};
