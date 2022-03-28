import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/People';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    };

    fetchPeople();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h2>People Page</h2>
      <PeopleTable people={people} />
    </div>
  );
};
