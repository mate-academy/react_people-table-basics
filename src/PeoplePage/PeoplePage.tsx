import React, { useState, useEffect } from 'react';
import { getPeople } from '../api/api';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../types';
import './PeoplePage.scss';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    async function fetchData() {
      const peopleFromServer: Person[] = await getPeople();
      const peopleWithParents = peopleFromServer.map(person => {
        return {
          ...person,
          mother: peopleFromServer.find(parent => parent.name === person.motherName),
          father: peopleFromServer.find(parent => parent.name === person.fatherName),
        };
      });

      setPeople(peopleWithParents);
    }

    fetchData();
  }, []);

  return (
    <div className="people">
      <h1 className="people__title title">People page</h1>
      <PeopleTable people={people} />
    </div>
  );
};
