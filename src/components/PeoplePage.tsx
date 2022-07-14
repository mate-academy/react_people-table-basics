import React, { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

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
      <p className="title has-title-centered">People Page</p>

      <PeopleTable people={people} />
    </>
  );
};
