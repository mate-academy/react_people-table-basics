import React, { useEffect, useState } from 'react';
import { getPeople } from '../../helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    getPeople().then(setPeople)
  },[])

  return (
    <table className="table is-fullwidth">
    <thead>
      <tr>
      <th>name</th>
      <th>sex</th>
      <th>born</th>
      <th>died</th>
      <th>mother</th>
      <th>father</th>
      </tr>
    </thead>
    <tbody>
    {people.map(person => (
      <tr
        key={person.slug}
      >
        <td>{person.name}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.motherName}</td>
        <td>{person.fatherName}</td>
      </tr>
    ))}
    </tbody>
    </table>
  );
};
