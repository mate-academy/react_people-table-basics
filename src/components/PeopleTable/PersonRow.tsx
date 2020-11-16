import React from 'react';
import { IPerson } from '../../Interfaces/Interfaces';

const PersonRow: React.FC<{ person: IPerson }> = ({ person }) => (
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
