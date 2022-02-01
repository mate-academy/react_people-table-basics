import React, { useState, useEffect } from 'react';
import { Human } from '../../interface/Human__interface';
import { getPeople } from '../../api/people';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Human[] | null>(null);

  const loadPeople = async () => {
    const peopleFromServer = await getPeople();

    //----------------------------------------------------------------------------------------

    const newPeople = peopleFromServer.map(person => ({
      ...person,
      mother: peopleFromServer.find(mother => mother.name === person.motherName),
      father: peopleFromServer.find(father => father.name === person.fatherName),
    }));

    setPeople(newPeople);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <PeopleTable people={people} />
  );
};
