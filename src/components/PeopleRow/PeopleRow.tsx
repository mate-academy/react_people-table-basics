import React from 'react';
import { Person } from '../../interfaces';

interface PersonProps {
  person: Person,
}

export const PeopleRow: React.FC<PersonProps> = ({ person }) => {
  return (
    <tr key={person.slug}>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  )
}