import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(data => setPeople(data));
  }, []);

  return (
    <>
      <h1 className="title">
        People page
      </h1>
      <PeopleTable people={people} />
    </>
  );
};
