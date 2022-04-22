import React, { useEffect, useState } from 'react';
import { getPeople } from './api/api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);

  const fetchPeople = async () => {
    const result = await getPeople();

    setPeopleFromServer(result);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const arrayOfPeople = peopleFromServer.map(child => ({
    ...child,
    father: peopleFromServer
      .find(father => father.name === child.fatherName) || null,
    mother: peopleFromServer
      .find(mother => mother.name === child.motherName) || null,
  }));

  return (
    <>
      <h3>People Page</h3>
      <PeopleTable arrayOfPeople={arrayOfPeople} />
    </>
  );
};
