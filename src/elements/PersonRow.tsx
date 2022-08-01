import React from 'react';
import { Persone } from '../react-app-env';

type Props = {
  person: Persone;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr>
      <th>{person.name}</th>
      <th>{person.sex}</th>
      <th>{person.born}</th>
      <th>{person.died}</th>
      <th>{person.motherName}</th>
      <th>{person.fatherName}</th>
    </tr>
  );
};
