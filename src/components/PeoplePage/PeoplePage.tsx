import React, { useEffect, useState } from 'react';
import { getPeopleFromServer } from '../../api/getPeople';
import { People } from '../../types/peopleType';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);

  useEffect(() => {
    getPeopleFromServer()
      .then(res => {
        setPeople([...res]);
      })
      .catch(() => setPeople([]));
  }, []);

  return (
    <>
      <h2>Below a table of people can be found:</h2>
      <PeopleTable people={people} />
    </>
  );
};
