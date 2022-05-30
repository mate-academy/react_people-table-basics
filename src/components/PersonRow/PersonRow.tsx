import React from 'react';
import { Person } from '../../react-app-env';

interface Props {
  person: Person,
}

export const PersonRow:React.FC<Props> = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName}</td>
    <td>{person.fatherName}</td>
  </tr>
);
