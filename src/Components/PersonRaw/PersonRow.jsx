import React, { useState, useEffect } from 'react';

import { getPeople } from '../../api/api';

export const PersonRow = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const visibilePeople = people.map(person => ({
    ...person,
    mother: people.find(mother => mother.name === person.motherName),
    father: people.find(father => father.name === person.fatherName),
  }));

  return (
    <>
      {visibilePeople.map(person => (
        <tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>{person.mother !== undefined ? (
            person.mother.name
          ) : (
            '-'
          )}</td>
          <td>{person.father !== undefined ? (
            person.father.name
          ) : (
            '-'
          )}</td>
        </tr>
      ))}
    </>
  )
};
