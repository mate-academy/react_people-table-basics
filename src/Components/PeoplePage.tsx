import React, { useEffect, useState } from 'react';
import { getPeople } from './api/api';
import { PeopleTable } from './PeopleTable';
import 'bulma/css/bulma.css';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const loadPeople = async () => {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="has-text-centered is-size-3">People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
