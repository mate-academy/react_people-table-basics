import React from 'react';
import { People } from '../../types/People';

export type Props = {
  person: People;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person">
      <th>{person.name}</th>
      <th>{person.sex}</th>
      <th>{person.born}</th>
      <th>{person.died}</th>
      <th>{person.motherName}</th>
      <th>{person.fatherName}</th>
    </tr>
  );
};
