import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const loadPage = useCallback(
    async () => {
      const loadedPage = await getPeople();

      setPeople(loadedPage);
    },
    [],
  );

  useEffect(
    () => {
      loadPage();
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
