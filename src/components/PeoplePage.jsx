import React, { useEffect, useState } from 'react';
import { getPeople } from './api/PeopleFromApi';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((people) => {
      const peopleAddedParam = people.map(person => ({
        ...person,
        father: people.find(father => father.name === person.fatherName),
        mother: people.find(mother => mother.name === person.motherName),
      }));

      setPeople(peopleAddedParam);
    });
  }, []);

  
  
  if (people.length === 0) {
    return (
      <p>No people yet</p>
    );
  }

  return (
    <div>
      <PeopleTable people={people} />
    </div>
  )
}
