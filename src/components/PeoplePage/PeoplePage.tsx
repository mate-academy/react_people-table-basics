import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<PersonWithParents[]>([]);

  useEffect(() => {
    (async () => {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map((person: Person) => ({
        ...person,
        mother: peopleFromServer.find(woman => woman.name === person.motherName) || null,
        father: peopleFromServer.find(man => man.name === person.fatherName) || null,
      }));

      setPeople(peopleWithParents);
    })();
  }, []);

  return (
    <div className="PeoplePage">
      <h1 className="title">People page</h1>
      <PeopleTable people={people} />
    </div>
  );
};
