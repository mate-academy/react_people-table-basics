import React, { useState, useEffect } from 'react';
import { getPeople } from '../api/people';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(peopleArray => (
        peopleArray.map(person => ({
          ...person,
          mother: peopleArray.find(
            ({ motherName }) => motherName.localeCompare(person.motherName),
          ) || null,
          father: peopleArray.find(
            ({ fatherName }) => fatherName.localeCompare(person.fatherName),
          ) || null,
        }))
      ))
      .then(setPeople);
  }, []);

  return (
    <>
      <h1 className="title">People page</h1>
      <PeopleTable people={people} />
    </>
  );
};
