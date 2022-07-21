import React, { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeoples = async () => {
      const response = await getPeople();

      setPeople(response);
    };

    try {
      fetchPeoples();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }, []);

  return (
    <div className="container">
      <h1>People table</h1>
      <PeopleTable people={people} />
    </div>
  );
});
