import React, { useEffect, useState } from 'react';
import { getPeopleApi } from './api/PeopleFromApi';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeopleApi().then((people) => {
      const peopleAddedParam = people.map(person => ({
        ...person,
        father: person.fatherName || 'undefined',
        mother: person.motherName || 'undefined',
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
