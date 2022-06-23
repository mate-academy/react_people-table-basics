import React from 'react';
import { PersonWithParents } from '../../../react-app-env';

interface Props {
  person: PersonWithParents;
}

export const PeopleRow: React.FC<Props> = ({ person }) => {
  return (
    <tr key={person.slug}>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother}</td>
      <td>{person.father}</td>
    </tr>
  );
};
