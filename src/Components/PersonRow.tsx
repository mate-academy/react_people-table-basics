import React from 'react';
import { Person } from './Types';

interface Props {
  person: Person,
}

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr className="person">
    <td>{person.name}</td>
    <td>{person.sex === 'f' ? 'Female' : 'Male'}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || 'undefined'}</td>
    <td>{person.fatherName || 'undefined'}</td>
  </tr>
);
