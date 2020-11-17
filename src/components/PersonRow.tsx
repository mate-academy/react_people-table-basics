import React from 'react';
import { People } from '../helpers/interfaces';

type PersonRowProps = {
  person: People,
  key: string,
};

export const PersonRow: React.FC<PersonRowProps> = ({ person }) => {
  return (
    <tr className="Person">
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
};
