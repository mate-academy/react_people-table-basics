import React from 'react';
import { Man } from '../types';

type Props = {
  person: Man,
};

export const PersonRow: React.FC<Props> = React.memo(({ person }) => {
  return (
    <tr className="Person">
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.fatherName}</td>
      <td>{person.motherName}</td>
    </tr>
  );
});
