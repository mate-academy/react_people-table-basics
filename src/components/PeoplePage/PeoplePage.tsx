import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';

import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const findPeople = async () => {
    setPeople(await getPeople());
  };

  useEffect(() => {
    findPeople();
  }, []);

  return (
    <>
      {people.length && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
