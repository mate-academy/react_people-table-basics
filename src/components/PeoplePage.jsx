import React, { useEffect, useState } from 'react';
import { getPeople } from './api/PeopleFromApi';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((people) => {
      const peopleAddedParam = people.map(person => ({
        ...person,
        father: people.filter(father => father.name === person.fatherName)[0],
        mother: people.filter(mother => mother.name === person.motherName)[0],
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
