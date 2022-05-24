import React from 'react';
import { Person } from '../../types/Person';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = React.memo(({ person }) => {
  return (
    <tr>
      <th>{person.name}</th>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
});
