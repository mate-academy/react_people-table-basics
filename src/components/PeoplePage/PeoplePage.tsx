import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[] | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      const personsFromServer = await getPeople();

      setPersons(personsFromServer);
    };

    fetchPeople();
  }, []);

  return (
    <div className="has-text-centered">
      <h2>People Page</h2>
      <PeopleTable people={persons} />
    </div>
  );
};
