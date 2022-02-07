/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
// Api requests
import { getPeople } from '../../api/people';
// Components
import { PeopleTable } from '../PeopleTable';
// Types
import { Person } from '../../types/Person/Person';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(receivedPeople => setPeople(receivedPeople));
  }, []);

  return (
    <>
      <h1>People page</h1>

      {people.length > 0 && <PeopleTable people={people} />}
    </>
  );
};
