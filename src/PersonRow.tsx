import React from 'react';
import { Person } from './typesDefinitions'

type personProps = {
  person: Person;
}

export const PersonRow: React.FC<personProps> = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.fatherName}</td>
      <td>{person.motherName}</td>
    </tr>
  );
};
