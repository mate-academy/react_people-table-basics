import React, { useEffect, useState } from 'react';
import { getPeople } from '../../people';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { Man } from '../../types';
import './People.scss';

export const People: React.FC = React.memo(() => {
  const [people, setPeople] = useState<Man[]>([]);

  useEffect(() => {
    getPeople()
      .then(response => setPeople(response));
  }, []);

  const findPeople = people.map(person => ({
    ...person,
    father: people.find(father => father.name === person.fatherName),
    mother: people.find(mother => mother.name === person.motherName),
  }));

  return (
    <div className="peoplePage">
      <h2 className="peoplePage__title">People page</h2>
      <PeopleTable people={findPeople} />
    </div>
  );
});
