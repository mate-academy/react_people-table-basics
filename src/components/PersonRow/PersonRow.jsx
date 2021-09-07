import React from 'react';

export const PersonRow = ({ people }) => people.map(person => (
  <tr key={person.name}>
    <th>{person.name}</th>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || (<b>MOTHER IS NOT DEFINED</b>)}</td>
    <td>{person.fatherName || (<b>FATHER IS NOT DEFINED</b>)}</td>
  </tr>
));
