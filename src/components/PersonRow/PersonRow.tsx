import React from 'react';
import { Person } from '../../type/person';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother ? person.mother.name : '-'}</td>
      <td>{person.father ? person.father.name : '-'}</td>
    </tr>
  );
};
