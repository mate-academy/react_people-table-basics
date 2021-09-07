import React from 'react';

export const PersonRow = ({ people }) => people.map(person => (
  <tr key={person.name}>
    <th>{person.name}</th>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.fatherName}</td>
    <td>{person.mothername}</td>
  </tr>
));
