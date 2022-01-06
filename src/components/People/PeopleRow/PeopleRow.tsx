import React from 'react';
import { Person } from '../../../types/Person';

import './PeopleRow.scss';

interface Props {
  person: Person;
}

export const PeopleRow: React.FC<Props> = ({ person }) => {
  return (
    <tr
      className="person"
    >
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName !== null ? person.motherName : <span>no record</span>}</td>
      <td>{person.fatherName !== null ? person.fatherName : <span>no record</span>}</td>
    </tr>
  );
};
