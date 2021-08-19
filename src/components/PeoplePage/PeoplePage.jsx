import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const addPeople = async() => {
      const humans = await getPeople();
      const peopleWithParents = humans.map(person => ({
        ...person,
        mother: humans.find(woman => person.motherName === woman.name),
        father: humans.find(man => person.fatherName === man.name),
      }));

      setPeople(peopleWithParents);
    };

    addPeople();
  }, []);

  return (
    <div className="App">
      <h1>People Page</h1>
      <PeopleTable people={people} />
    </div>
  );
};
