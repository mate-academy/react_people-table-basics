import React from 'react';
import { Person } from './PersonInterface';

const PersonRow: React.FC<({ person: Person })> = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother}</td>
    <td>{person.father}</td>
  </tr>
);

export default PersonRow;