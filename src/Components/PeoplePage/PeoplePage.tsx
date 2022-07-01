import React, { useState, useEffect } from 'react';
import { getPeople } from '../../Api/People';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const loadAllPeople = async () => {
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
  };

  useEffect(() => {
    loadAllPeople();
  }, []);

  return (
    <>
      <h1>Peope page</h1>
      <PeopleTable
        people={people}
      />
    </>
  );
};
