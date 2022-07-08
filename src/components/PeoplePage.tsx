import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

  const loadPeople = useCallback(
    async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setPeople([]);
      }
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
      <p className="title has-text-centered">People Page</p>

      <PeopleTable people={people} />
    </>
  );
};
