import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(peopleArray => peopleArray.map(person => ({
        ...person,
        mother: peopleArray.find(mother => mother.name === person.motherName),
        father: peopleArray.find(father => father.name === person.fatherName),
      })))
      .then(setPeople);
  }, []);

  return (
    <div className="container">
      <h2 className="mt-5 ml-5">People Page</h2>
      <PeopleTable people={people} />
    </div>
  );
};
