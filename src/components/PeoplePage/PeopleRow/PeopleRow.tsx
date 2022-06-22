import React from 'react';
import { People } from '../../../react-app-env';

interface Props {
  person: People;
}

export const PeopleRow: React.FC<Props> = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName || '-'}</td>
      <td>{person.fatherName || '-'}</td>
    </tr>
  );
};
